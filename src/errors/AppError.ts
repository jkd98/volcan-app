export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode;
        /**
         * Sirve para que, cuando veas el error en la consola, 
         * el "rastro" (stack trace) no mencione la clase AppError, 
         * sino que apunte directamente al lugar exacto de el Service donde  se lanzastó el error. 
         */
        Error.captureStackTrace(this, this.constructor);
    }
}