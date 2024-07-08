import pool from '../database';

interface IBook {
    id?: number;
    title: string;
    author: string;
    publicationDate: string;
    genres: string[];
}

export const addBook = async (book: IBook) => {
    const { title, author, publicationDate, genres } = book;
    const result = await pool.query(
        'INSERT INTO books (title, author, publication_date, genres) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, author, publicationDate, genres]
    );
    return result.rows[0];
};

export const getBooks = async () => {
    const result = await pool.query('SELECT * FROM books');
    return result.rows;
};

export const getBookById = async (id: number) => {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
};

export const updateBook = async (id: number, book: IBook) => {
    const { title, author, publicationDate, genres } = book;
    const result = await pool.query(
        'UPDATE books SET title = $1, author = $2, publication_date = $3, genres = $4 WHERE id = $5 RETURNING *',
        [title, author, publicationDate, genres, id]
    );
    return result.rows[0];
};

export const deleteBook = async (id: number) => {
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
};
