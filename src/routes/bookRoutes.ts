import express from 'express';
import { createBook, listBooks, getBook, modifyBook, removeBook } from '../controllers/bookController';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';

const router = express.Router();

router.route('/')
    .post(authMiddleware, adminMiddleware, createBook)
    .get(listBooks);

router.route('/:id')
    .get(getBook)
    .put(authMiddleware, adminMiddleware, modifyBook)
    .delete(authMiddleware, adminMiddleware, removeBook);

export default router;
