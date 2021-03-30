const pool = require('../utils/pool');

module.exports = class User {
    id;
    userName;
    birthMonth;
    advice;

    constructor(row) {
        this.id = row.id;
        this.userName = row.user_name;
        this.birthMonth = row.birth_month;
        this.advice = row.advice
    }

    static async insert({ userName, birthMonth, newAdvice }) {
        const { rows, } = await pool.query(
            'INSERT INTO users (user_name, birth_month, advice) VALUES ($1, $2, $3) RETURNING *',
            [userName, birthMonth, newAdvice]
        );
        return new User(rows[0]);
    }

    static async getAll() {
        const { rows, } = await pool.query(
            'SELECT * FROM users',
        );
        const users = rows.map(row => new User(row));
        return users;
    }

    static async getById(id) {
        const { rows, } = await pool.query(
            'SELECT * FROM users WHERE id=$1',
            [id]
        );
        return new User(rows[0]);
    }

    static async delete(id) {
        const { rows, } = await pool.query(
            'DELETE FROM users WHERE id=$1 RETURNING *',
            [id]
        );
        return new User(rows[0]);
    }

    static async update(id, newAdvice) {
        const { rows, } = await pool.query(
            'UPDATE users SET advice=$1 WHERE id=$2 RETURNING *',
            [newAdvice, id]
        );
        return new User(rows[0]);
    }
};
