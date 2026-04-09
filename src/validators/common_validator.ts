// src/validators/common_validator.ts
import { param } from 'express-validator';

export const id_param_validator = [
    param('uuid').isUUID(4).withMessage('Formato de identificador no válido').bail()
];