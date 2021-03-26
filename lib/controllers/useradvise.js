const { Router } = require('express');
const pool = require('../utils/pool');
const { default: axios } = require('axios');

module.exports = Router()

    .post('/', async (req, res, next) => {
        try {
            //get random advise and save as variable newAdvise

            // await sendSms(
            //     process.env.ORDER_HANDLER_NUMBER,
            //     `New profile created for ${userName}. Your advise: ${newAdvise}`
            // );
            const { rows, } = await pool.query(
                'INSERT INTO users (user_name, birth_month, advise) VALUES ($1, $2, $3) RETURNING *',
                [req.body.userName, req.body.birthMonth, newAdvise]
            );

            const order = rows[0];
            res.send(order);
        } catch (err) {
            next(err);
        }
    })