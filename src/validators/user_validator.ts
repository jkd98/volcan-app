import { body } from "express-validator";

/**
 * Reglas de validación para la creación de un usuario
 */
export const create_user_validator = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre del usuario es obligatorio.')
        .bail()
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener al menos 2 caracteres y un máximo de 50.')
        .escape(),
    body('email')
        .trim()
        .notEmpty().withMessage('El email es obligatorio.')
        .bail()
        .isEmail().withMessage('El email no tiene un formato correcto.')
        .normalizeEmail(), // Convierte a minúsculas y quita puntos extra en Gmail. Para Gmail, juan.perez@gmail.com y juanperez@gmail.com
    body('pass')
        .notEmpty().withMessage('La contarseña es obligatoria.')
        .bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage('La contraseña debe incluir mayúsculas, minúsculas, números y símbolos.'),
    body('image')
        .optional()
        .custom(value => {
        const extensiones = ['.jpg', '.jpeg', '.png'];
        const esValida = extensiones.some(ext => value.toLowerCase().endsWith(ext));
        if (!esValida) throw new Error('Formato de imagen no permitido (solo JPG, PNG).');
        return true;
    }),
]