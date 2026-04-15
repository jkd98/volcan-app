import { body } from 'express-validator';

/**
 * Reglas de validación para la creación de una presentación
 */
export const create_presentation_validator = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre de la presentación es obligatorio')
        .bail()
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .escape(),
    body('descrip')
        .optional()
        .trim()
        .notEmpty().withMessage('El nombre de la presentación no puede ir vacío')
        .bail()
        .isLength({ min: 3 }).withMessage('La descripción debe tener al menos 3 caracteres')
        .escape(),
    body('price')
        .isNumeric().withMessage('El precio debe ser un valor numérico')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a cero'),
    body('category')
        .trim()
        .custom(value => value === 'Especialidad' || value === 'Sencillo').withMessage('Seleccione una categoria válida')
];