import {body} from 'express-validator'

export const registerValidation =[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:4}).withMessage('Password too short'),
    body('name').notEmpty().withMessage('Name required')
]

export const loginValidation = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password required')
]

export const offerValidation = [
    body('title')
        .isLength({min:4,max:40}).withMessage('Titulo mas de 4 caracteres'),
    body('description').optional().isLength({max:2000}),
    body('contactEmail').optional().isEmail().withMessage('Invalid email'),
    body('published').optional().isISO8601().toDate().withMessage('Formato de fecha incorrecto'),
    body('expired').isISO8601().toDate().withMessage('Formato de fecha incorrecto')
]

export const categoryValidation = [
    body('name').notEmpty().withMessage('Name required')
]

export const rateValidation = [
    body('value').isInt({min:0, max:5}).toInt().withMessage('Value is required')
]

export const quejaValidation = [
    body('title')
        .isLength({ min: 4, max: 100 }).withMessage('Title must be between 4 and 100 characters')
        .notEmpty().withMessage('Title is required'),
    body('description')
        .isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters')
        .notEmpty().withMessage('Description is required'),
    body('idUser')
        .isInt().withMessage('User ID must be a valid number')
        .notEmpty().withMessage('User ID is required')
]
//...