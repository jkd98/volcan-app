import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { IApiResponse } from '../interfaces/IIApiResponse.js';

export const handle_input_errors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response:IApiResponse<null> = {
            success:false,
            message:'Algunos campos no pasaron las validciones',
            errors:errors.array()
        };
        return res.status(400).json(response);
    }
    next();
};