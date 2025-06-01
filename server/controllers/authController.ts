import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import * as authService from '../services/authService'
import User from '../models/user'

export const registerValidation = [
    body('name').notEmpty().withMessage('Imie jest wymagane'),
    body('surname').notEmpty().withMessage('Nazwisko jest wymagane'),
    body('email').isEmail().withMessage('Niepoprawny email'),
    body('password').isLength({ min: 6 }).withMessage('Hasło musi mieć przynajmniej 6 znaków'),
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
            res.status(400).json({ message: 'Email już w użyciu' })
            return
        }
        
        user = await authService.registerUser(name, surname, trimmedEmail, trimmedPassword)

        res.status(201).json({ message: 'Konto utworzone!', user: { id: user._id, email: user.email, name: user.name } })
    } catch (error: any) {
        console.error("Bład przy rejestracji:", error)
        res.status(500).json({ message: 'Błąd przy rejestracji', error: error.message || 'Nieznany błąd rejestracji' })
        return
    }
}

export const loginValidation = [
    body('email').isEmail().withMessage('Niepoprawny email'),
    body('password').notEmpty().withMessage('Niepoprawne hasło'),
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
            res.status(400).json({ message: 'Nieudane zalogowanie' })
            return
        }

        const { user, token } = result

        res.status(200).json({
            message: 'Poprawnie zalogowano!',
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
        console.error("Błąd logowania:", error)
        res.status(500).json({ message: 'Błąd servera przy logowaniu', error: error.message || 'Nieznany błąd logowania' })
        return
    }
}