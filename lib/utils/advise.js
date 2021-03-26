const { default: axios } = require('axios');

const getAdvise = async () => {
    const { data } = await axios.get(
        `https://api.adviceslip.com/advice`
    );
    return data.slip.advice;
};

module.exports = { getAdvise };