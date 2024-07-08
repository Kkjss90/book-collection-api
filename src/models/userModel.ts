import pool from '../database';
import bcrypt from 'bcryptjs';

interface IUser {
    id?: number;
    username: string;
    email: string;
    password: string;
    role?: number;
}

export const registerUser = async (user: IUser) => {
    const { username, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [username, email, hashedPassword, 1]
    );

    return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

export const findUserById = async (id: number) => {
    const result = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [id]);
    return result.rows[0];
};

export const updateUserRole = async (id: number, role: number) => {
    const result = await pool.query(
        'UPDATE users SET role = $1 WHERE id = $2 RETURNING *',
        [role, id]
    );

    return result.rows[0];
};
