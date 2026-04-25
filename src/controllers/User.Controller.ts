import { NextFunction, Request, Response } from "express";

import { User } from "../models/Users.model.js";
import userService from "../services/UserService.js"
import { IApiResponse } from "../interfaces/IApiResponse.js";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.createUser(req.body);
        const response: IApiResponse<User> = {
            success: true,
            message: "Usuario registrado",
            data: result
        };

        return res.status(201).json(response);

    } catch (error) {
        next(error);
    }
}