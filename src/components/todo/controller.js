const service = require('./service');


const getAll = async (req, res, next) => {
    try {
        console.log(req.user);
        const result = await service.getAll(req.session.user.id);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
}


const getOne = async (req, res, next) => {
    try {
        const result = await service.getOne(req.session.user.id, req.params.id);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
}


const add = async (req, res, next) => {
    try {
        const result = await service.add(req.session.user.id, req.body.title, req.body.description);
        res.status(201).send(result);
    }
    catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await service.update(req.session.user.id, req.params.id, req.body.title, req.body.description);
        res.status(202).send(result);
    }
    catch (error) {
        next(error);
    }
}

const remove = async (req,res, next) => {
    try {
        await service.remove(req.session.user.id, req.params.id);
        res.status(204).send({
            code: 'delete successfull',
            message: 'item is deleted successfully.'
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = { getAll, getOne, add, update, remove };