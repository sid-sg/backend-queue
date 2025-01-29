import { signupSchema, loginSchema } from '../schemas/userSchema';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    body: any;
}

interface CustomError extends Error {
    errors: { path: string[]; message: string }[];
}

function signupMiddleware(req: CustomRequest, res: Response, next: NextFunction): void {
    try {
        signupSchema.parse(req.body);
        next();
    } catch (e) {
        const error = e as CustomError;
        console.log(error);
        res.status(400).json({
            errors: error.errors.map(err => ({
                field: err.path[0],
                message: err.message
            }))
        });
    }
}

interface LoginRequest extends Request {
    body: any;
}

interface LoginError extends Error {
    errors: { path: string[]; message: string }[];
}

function loginMiddleware(req: LoginRequest, res: Response, next: NextFunction): void {
    try {
        loginSchema.parse(req.body);
        next();
    } catch (e) {
        const error = e as LoginError;
        console.log(error);
        res.status(400).json({
            errors: error.errors.map(err => ({
                field: err.path[0],
                message: err.message
            }))
        });
    }
}

export {
    signupMiddleware,
    loginMiddleware,
}