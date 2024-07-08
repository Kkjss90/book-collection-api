import { Request, Response } from 'express';
import { registerUser, findUserByEmail, findUserById, updateUserRole } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    try {
        const user = await registerUser(req.body);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
        res.status(201).json({ ...user, token });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
            res.json({ ...user, token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await findUserById(req.user!.id);
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRole = async (req: Request, res: Response) => {
    const { role } = req.body;

    try {
        const user = await updateUserRole(Number(req.params.id), role);
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
