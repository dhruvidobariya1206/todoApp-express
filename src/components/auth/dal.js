
const insert = async (dbClient, username, password) => {
    const query = `
    INSERT 
    INTO "user" 
        (username, 
        password)
    VALUES ($1, $2) 
    returning *;`
    const parameters = [username, password];
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

module.exports = { insert, getOneByNamePass, getOneByName };