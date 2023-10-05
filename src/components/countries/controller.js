const { getAll, getOne } = require('./service');


const getCountries = async (req, res, next) => {
    try {
        const result = await getAll();
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
}

const getOneCountry = async (req, res, next) => {
    try{
        const result = await getOne(req.params.id);
        res.status(200).send(result);
    }
    catch(error) {
        next(error);
    }
}

module.exports = { getCountries, getOneCountry };