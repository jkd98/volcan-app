import { body } from 'express-validator';

/**
 * Reglas de validación para la creación de una presentación
 */
export const create_presentation_validator = [
    body('name')
        .notEmpty().withMessage('El nombre de la presentación es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .trim()
        .escape(),
    body('descrip')
        .notEmpty().withMessage('El nombre de la presentación es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .trim()
        .escape(),
    body('price')
        .isNumeric().withMessage('El precio debe ser un valor numérico')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a cero'),
    body('category')
        .optional()
        .isInt({ min: 0 }).withMessage('El stock no puede ser negativo')
];