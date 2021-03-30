
const User = require('../models/User');
const { getAdvice } = require('../utils/advice');
const pool = require('../utils/pool');
const { sendSms } = require('../utils/twilio');

module.exports = class UserService {
    static async create({ userName, birthMonth }) {
        const newAdvice = await getAdvice();

        await sendSms(
            process.env.ORDER_HANDLER_NUMBER,
            `New profile created for ${userName}. Your advice: ${newAdvice}`
        );

        const newUser = await User.insert({ userName, birthMonth, newAdvice });
        return newUser;
    }

    static async update(id) {
        const newAdvice = await getAdvice();

        await sendSms(
            process.env.ORDER_HANDLER_NUMBER,
            `Hello! Your new advice: ${newAdvice}`
        );

        const updatedUser = await User.update(id, newAdvice);
        return updatedUser;
    }

    static async delete(id) {
        await sendSms(
            process.env.ORDER_HANDLER_NUMBER,
            `Hello, you have deleted your account.`
        );

        const user = await User.delete(id);
        return user;
    }
};
