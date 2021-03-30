const { default: axios } = require('axios');

const getAdvice = async () => {
    const { data } = await axios.get(
        `https://api.adviceslip.com/advice`
    );
    return data.slip.advice;
};

module.exports = { getAdvice };