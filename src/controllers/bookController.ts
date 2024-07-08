import { Request, Response } from 'express';
import { addBook, getBooks, getBookById, updateBook, deleteBook } from '../models/bookModel';

export const createBook = async (req: Request, res: Response) => {
    try {
        const book = await addBook(req.body);
        res.status(201).json(book);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const listBooks = async (req: Request, res: Response) => {
    try {
        const books = await getBooks();
        res.json(books);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getBook = async (req: Request, res: Response) => {
    try {
        const book = await getBookById(Number(req.params.id));
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const modifyBook = async (req: Request, res: Response) => {
    try {
        const book = await updateBook(Number(req.params.id), req.body);
        res.json(book);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const removeBook = async (req: Request, res: Response) => {
    try {
        await deleteBook(Number(req.params.id));
        res.status(204).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
