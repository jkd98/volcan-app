import { AppError } from './AppError.js';

export class BadRequestError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class DuplicateError extends AppError {
    constructor(message:string){
        super(message,409);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message:string){
        super(message,401);
    }
}