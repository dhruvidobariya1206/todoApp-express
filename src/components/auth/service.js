const pool = require('../../../dbconn');
const dal = require('./dal');

const ifExist = async(client, username, email) => {
    const userByName = await dal.getOneByName(client, username);
    const userByEmail = await dal.getOneByEmail(client, email);
    if (userByName || userByEmail) {
        return true;
    }
    return false;    
}

const registerService = async(username, password, email) => {
    const client = await pool.connect();
    try {
        const user = await ifExist(client, username, email)
        if(!user){
            const insert =  await dal.insert(client, username, password, email);
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