import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';
import authMiddleware from './middleware/authMiddleware';
import adminMiddleware from './middleware/adminMiddleware';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/books', authMiddleware, bookRoutes);
app.use('/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Book Collection API');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
