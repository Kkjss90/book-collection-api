import express from 'express';
import { register, login, getMe, updateRole } from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);
router.put('/:id/role', authMiddleware, adminMiddleware, updateRole);

export default router;
