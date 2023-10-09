const { pool } = require('../../../dbconn');
const dal = require('./dal');

const ifUserExist = async(client, username, email) => {
    const user = await dal.getOneByName(client, username, email);
    if (user) {
        return true;
    }
    return false;    
}


module.exports = {
    register : async(username, password, email) => {
        const client = await pool.connect();
        try {
            const user = await ifUserExist(client, username, email)
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
    },
    
    login : async(username, password) => {
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
    },

    logout : (session) => {
        if(session.user) {
            session.destroy((err) => {
                if(err){
                    throw new Error('UNAUTHORIZED');
                }
            });
        }
    },

}

