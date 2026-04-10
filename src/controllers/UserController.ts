import { User } from "../models/Users.model.js";
import { UserService } from "../services/UserService.js";
import { Request, Response } from "express";
import { ApiResponse } from "../types/api_response.js";
import { AppError } from "../errors/AppError.js";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await UserService.createUser(req.body);
        const response: ApiResponse<User> = {
            success: true,
            message: "Usuario registrado",
            data: result
        };

        return res.status(201).json(response);
    
    } catch (error) {
        let errorResponse: ApiResponse<null> = {
            success: false,
            message: ''
        }

        if (error instanceof AppError) {
            errorResponse.message = error.message;
            return res.status(error.statusCode).json(errorResponse);
        }

        console.log(error); // para debuguear

        errorResponse.message="Ocurrió un error interno en el servidor";
        return res.status(500).json(errorResponse)

    }
}