import { Request, Response, NextFunction } from 'express';

const ADMIN_ROLE = 2;

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && Number(req.user.role) === ADMIN_ROLE) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Admins only' });
    }
};

export default adminMiddleware;
