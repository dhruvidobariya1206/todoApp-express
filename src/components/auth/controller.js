const { registerService, loginService } = require('./service');

const register = async (req,res, next) => {
    try {
        const result = await registerService(req.body.username,req.body.password);
        res.status(201).send(result)
    }
    catch (error){
        next(error);
    }
}


const login = async (req,res, next) => {
    try {
        const result = await loginService(req.body.username, req.body.password);
        req.session.user = result;
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
}


const logout = (req,res) => {
    if(req.session.user) {
        req.session.destroy((err) => {
            if(err){
                res.status(400).send('Unable to logout');
            }
            else {
                res.send('Logout Successful')
            }
        });
    }
}


module.exports = { register, login, logout };