import User from '../models/user'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ path: `../.env` })

const JWT_SECRET = process.env.JWT_SECRET || "key"

export const registerUser = async (name: string, surname: string, email: string, password: string) => {
    const user = new User({
        name,
        surname,
        email,
        password: password,
    })
    await user.save()
    return user
}

export const loginUser = async (email: string, passwordPlain: string) => {
    const user = await User.findOne({ email })
    if (!user) {
        return null
    }

    if (user.password === undefined || passwordPlain === undefined) {
        console.error("DEBUG: One of the passwords is undefined. user.password:", user.password, "passwordPlain:", passwordPlain)
        return null
    }

    const isMatch = await user.comparePassword(passwordPlain)
    if (!isMatch) {
        return null
    }

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' }
    )

    return { user, token }
}