import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ApiResponse } from '../types/api_response.js';

export const handle_input_errors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response:ApiResponse<null> = {
            success:false,
            message:'Algunos campos no pasaron las validciones',
            errors:errors.array()
        };
        return res.status(400).json(response);
    }
    next();
};