module.exports.ERRORS = {
    INVALID_DATA: {
        code: 400,
        response: {
            code: 'invalid_data',
            message: 'Provided data are invalid.',
        }
    },
    RESOURCE_NOT_FOUND : {
        code: 404,
        response: {
            code: 'resource_not_found',
            message: 'Requested resource not found.',
        }
    },
    UNAUTHORIZED: {
        code: 401,
        response: {
            code: 'User not successfully created',
            message: 'User registration is not successfull.',
        }
    },
    CONFLICT: {
        code: 409,
        response: {
            code: 'User already exists',
            message: 'User is not available.',
        }
    },
    PAGE_NOT_FOUND: {
        code: 404,
        response: {
            code: 'Page not found',
            message: 'Requested page does not exist.',
        }
    },
};


// module.exports.