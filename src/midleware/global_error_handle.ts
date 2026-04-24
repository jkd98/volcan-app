import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors/AppError.js";
import { IApiResponse } from "../interfaces/IIApiResponse.js";

export const global_error_handle = (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let msg = 'Ocurrió un error interno en el servidor';


    if (error instanceof AppError) {
        statusCode = error.statusCode;
        msg = error.message;
    } else {
        console.log(error); // para debuguear
    }

    const errorResponse: IApiResponse<null> = {
        success: false,
        message: msg
    }

    return res.status(statusCode).json(errorResponse)
}