
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
};
