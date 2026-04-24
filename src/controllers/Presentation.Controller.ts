import { NextFunction, Request, Response } from "express"
import { PresentationService } from "../services/Presentation.Service.js"
import { IApiResponse } from "../interfaces/IIApiResponse.js"
import { Presentation } from "../models/Presentation.model.js"
import { AppError } from "../errors/AppError.js"

export const createPresentation = async (req: Request, res: Response, next:NextFunction ) => {
    let response: IApiResponse<Presentation> = {
        success: true,
        message: "Presentación registrada",
    }
    try {
        const presentation = await PresentationService.createPresentation(req.body, '');
        response.data = presentation

        return res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}