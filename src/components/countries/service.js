const axios = require("axios");

const api = process.env.COUNTRY_API;

module.exports = {
  getAll: async () => {
    const result = await axios.get(api);
    return result.data.data.countries;
  },

  getOne: async (id) => {
    const result = await axios.get(api);
    const countryArr = result.data.data.countries;
    const resultCountry = countryArr.find((country) => country.id == id);
    if (!resultCountry) {
      throw new Error("RESOURCE_NOT_FOUND");
    }
    return resultCountry;
  },
};
