import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import * as authService from '../services/authService'
import User from '../models/user'

export const registerValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('surname').notEmpty().withMessage('Surname is required'),
    body('email').isEmail().withMessage('Incorrect email encoding'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
]

export const registerHandler = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    const { name, surname, email, password } = req.body

    const trimmedEmail = email ? String(email).trim().toLowerCase() : ''
    const trimmedPassword = password ? String(password).trim() : ''

    try {
        let user = await User.findOne({ email: trimmedEmail })
        if (user) {
            res.status(400).json({ message: 'This email is already in use' })
            return
        }
        
        user = await authService.registerUser(name, surname, trimmedEmail, trimmedPassword)

        res.status(201).json({ message: 'Successfully registered', user: { id: user._id, email: user.email, name: user.name } })
    } catch (error: any) {
        console.error("Registration error:", error)
        res.status(500).json({ message: 'Registration error', error: error.message || 'Unknown registration error' })
        return
    }
}

export const loginValidation = [
    body('email').isEmail().withMessage('Incorrect email address'),
    body('password').notEmpty().withMessage('Password is incorrect'),
]

export const loginHandler = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    const { email, password } = req.body
    
    const trimmedEmail = email ? String(email).trim().toLowerCase() : ''
    const trimmedPassword = password ? String(password).trim() : ''

    try {
        const result = await authService.loginUser(trimmedEmail, trimmedPassword)

        if (!result) {
            res.status(400).json({ message: 'Incorrect login data' })
            return
        }

        const { user, token } = result

        res.status(200).json({
            message: 'Logged in successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                team: user.team,
                role: user.role,
            },
        })
    } catch (error: any) {
        console.error("Login error:", error)
        res.status(500).json({ message: 'Server error while logging in', error: error.message || 'Unknown login error' })
        return
    }
}