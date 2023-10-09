const { getAll, getOne } = require('./service');

module.exports = {
    getCountries : async (req, res, next) => {
        try {
            const result = await getAll();
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    },

    getOneCountry : async (req, res, next) => {
        try{
            const result = await getOne(req.params.id);
            res.status(200).send(result);
        }
        catch(error) {
            next(error);
        }
    },

    countries : {
        allCountries : () => {
            const countries = [
                {id: 1,
                name: "India"},
                {id: 2,
                name: "Albania"}
            ];
            return countries;
        }
    },
}

