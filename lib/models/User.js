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
};
