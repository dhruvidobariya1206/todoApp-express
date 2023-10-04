const axios = require('axios');

const api = 'https://dev-api-minibrands.zurutech.online/v1/countries';


const getCountries = async (req, res, next) => {
    try {
        const result = await axios.get(api);
        res.status(result.status).send(result.data.data.countries);
    }
    catch (error) {
        next(error);
    }
}

const getOneCountry = async (req, res, next) => {
    try{
        console.log(req.params.id);
        res.status(200).send();
        // const result = await axios.get(`${api}/`)
    }
    catch(error) {
        next(error);
    }
}

module.exports = { getCountries, getOneCountry };