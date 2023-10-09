const service = require('./service');

module.exports = {
    getAll : async (req, res, next) => {
        try {
            const userId = req.session.user.id;
            const result = await service.getAll(userId);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    },

    getOne : async (req, res, next) => {
        try {
            const userId = req.session.user.id;
            const todoId = req.params.id;
            const result = await service.getOne(userId, todoId);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    },

    add : async (req, res, next) => {
        try {
            const userId = req.session.user.id;
            const title = req.body.title;
            const description = req.body.description;
            const result = await service.add(userId, title, description);
            res.status(201).send(result);
        }
        catch (error) {
            next(error);
        }
    },
    
    update : async (req, res, next) => {
        try {
            const userId = req.session.user.id;
            const title = req.body.title;
            const description = req.body.description;
            const todoId = req.params.id;
            const result = await service.update(userId, todoId, title, description);
            res.status(202).send(result);
        }
        catch (error) {
            next(error);
        }
    },

    remove : async (req,res, next) => {
        try {
            const userId = req.session.user.id;
            const todoId = req.params.id;
            await service.remove(userId, todoId);
            res.status(204).send({
                code: 'delete successfull',
                message: 'item is deleted successfully.'
            });
        }
        catch (error) {
            next(error);
        }
    },

}
