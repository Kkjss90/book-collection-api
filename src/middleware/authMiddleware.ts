import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../database';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                username: string;
                email: string;
                role: string;
            };
        }
    }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

        const result = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [decoded.id]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = result.rows[0];
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default authMiddleware;
