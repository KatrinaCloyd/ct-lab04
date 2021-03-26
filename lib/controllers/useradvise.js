const { Router } = require('express');
const pool = require('../utils/pool');
const { getAdvise } = require('../utils/advise');
const { sendSms } = require('../utils/twilio');


module.exports = Router()

    .post('/', async (req, res, next) => {
        try {
            const newAdvise = await getAdvise();
            await sendSms(
                process.env.ORDER_HANDLER_NUMBER,
                `New profile created for ${req.body.userName}. Your advise: ${newAdvise}`
            );

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