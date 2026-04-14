import { User } from "../models/Users.model.js";
import { UserService } from "../services/UserService.js";
import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../types/api_response.js";
import { AppError } from "../errors/AppError.js";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await UserService.createUser(req.body);
        const response: ApiResponse<User> = {
            success: true,
            message: "Usuario registrado",
            data: result
        };

        return res.status(201).json(response);

    } catch (error) {
        next(error);
    }
}