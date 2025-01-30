import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';

interface DecodedToken {
    userId: string;
}
interface AuthenticatedRequest extends Request {
  userId?: string;
}


const jwtAuthMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) : void => {
    
    const header = req.headers.authorization;

    if (!(header) || !(header.startsWith('Bearer'))) {
        res.status(403).json({ message: 'not authorized' });
        return;
    }
    const token = header.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        req.userId = decoded.userId;
        next();
    } catch (e) {
        console.log(e);
        res.status(403).json({ message: 'not authorized' });
        return;
    }
}

export {jwtAuthMiddleware};