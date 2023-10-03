const pool = require('../../../dbconn');
const dal = require('./dal');

const ifExist = async(client, username) => {
    const user = await dal.getOneByName(client, username);
    // console.log((user.length));
    if (user) {
        return true;
    }
    return false;    
}

const registerService = async(username, password) => {
    const client = await pool.connect();;
    try {
        // if(!password || password.length<8 || !username) {
        //     throw new Error('INVALID_DATA');
        // }
        const user = await ifExist(client, username)
        if(!user){
            const insert =  await dal.insert(client, username, password);
            return insert;
        }
        else {
            throw new Error('CONFLICT');
        } 
    }
    finally {
        client.release();
    }
}

const loginService = async(username, password) => {
    const client = await pool.connect();
    try {
        // if(!username || !password || password.length<8) {
        //     throw new Error('INVALID_DATA');
        // }
        const user = await dal.getOneByNamePass(client, username, password);
        if(user) {
            return user;
        }
        throw new Error('RESOURCE_NOT_FOUND');
    }
    finally {
        client.release();
    }
}

module.exports = {registerService, loginService};