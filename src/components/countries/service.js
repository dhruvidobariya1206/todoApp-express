const axios = require('axios');


const api = 'https://dev-api-minibrands.zurutech.online/v1/countries';



const getAll = async () => {
    const result = await axios.get(api);
    return result.data.data.countries;
}

const getOne = async (id) => {
    const result = await axios.get(api);
    const countryArr = result.data.data.countries;
    const rsltCountry = countryArr.find((country) => country.id == id);
    if(!rsltCountry) {
        throw new Error('RESOURCE_NOT_FOUND');
    }
    return rsltCountry;
}



module.exports = { getAll, getOne };