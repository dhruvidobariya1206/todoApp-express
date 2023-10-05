
const insert = async (dbClient, username, password, email) => {
    const query = `
    INSERT 
    INTO "user" 
        (username, 
        password,
        email)
    VALUES ($1, $2, $3) 
    returning *;`
    const parameters = [username, password, email];
    const result = await dbClient.query(query,parameters);
    return result.rows[0];
}

const getOneByNamePass = async (dbClient, username, password) => {
    const query = `
    SELECT 
        id,
        username
    FROM 
        "user" 
    WHERE 
        username=($1) AND 
        password=($2);`
    const parameters = [username, password];
    const result = await dbClient.query(query,parameters);
    return result.rows[0];
}

const getOneByName = async (dbClient, username) => {
    const query = `
    SELECT
        id,
        username
    FROM 
        "user" 
    WHERE 
        username=($1);`
    const parameters = [username];
    const result = await dbClient.query(query,parameters);
    return result.rows[0];
}

const getOneByEmail= async (dbClient, email) => {
    const query = `
    SELECT
        id,
        email
    FROM 
        "user" 
    WHERE 
        email=($1);`
    const parameters = [email];
    const result = await dbClient.query(query,parameters);
    return result.rows[0];
}

module.exports = { insert, getOneByNamePass, getOneByName, getOneByEmail };