export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;       // Aquí va el resultado (User, Presentation, etc.)
    errors?: any;    // Detalles de validación si falló
    meta?: {         // Aquí va lo que mencionabas: LA PAGINACIÓN
        total: number;
        page: number;
        last_page: number;
    };
}