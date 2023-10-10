module.exports = {
  insert: async (dbClient, username, password, email) => {
    const query = `
        INSERT 
        INTO "userAccount" 
            (username, 
            password,
            email)
        VALUES ($1, $2, $3) 
        RETURNING *;`;
    const parameters = [username, password, email];
    const result = await dbClient.query(query, parameters);
    return result.rows[0];
  },

  getOneByNamePass: async (dbClient, username, password) => {
    const query = `
        SELECT 
            id,
            username,
            email
        FROM 
            "userAccount" 
        WHERE 
            username=($1) AND 
            password=($2);`;
    const parameters = [username, password];
    const result = await dbClient.query(query, parameters);
    return result.rows[0];
  },

  getOneByName: async (dbClient, username, email) => {
    const query = `
        SELECT
            id,
            username,
            email
        FROM 
            "userAccount" 
        WHERE 
            username=($1) OR
            email=($2);`;
    const parameters = [username, email];
    const result = await dbClient.query(query, parameters);
    return result.rows[0];
  },
};
