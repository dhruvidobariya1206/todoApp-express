const express = require('express');

const isAuth = (req, res, next) => {
    if(!req.session.user) {
        res.status(401).send({
            code: 'Unauthorised',
            message: 'Validation required'
        });
    }
    else {
        // console.log(req.session.user);
        next();
    }  
}

module.exports = { isAuth };