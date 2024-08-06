import { Request, Response, NextFunction } from 'express';

// Custom error class to handle application-specific errors
class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'AppError';
    }
}

// Global error handling middleware
export const errorHandler = (err: AppError | Error, req: Request, res: Response, next: NextFunction): void => {
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    res.status(statusCode).json({ error: message });
};

// Export the custom error class
export { AppError };