
const getOneByIdUser = async (dbClient, userId, todoId) => {
    const query = `
    SELECT 
        id,
        title,
        description
    FROM 
        todo 
    WHERE 
        id = $1 AND 
        "userId" = $2 AND 
        "isCompleted" = false;`
    const parameters = [todoId, userId];
    const result = await dbClient.query(query,parameters);
    return result.rows[0];
}

const insert = async (dbClient, userId, title, description) => {
    const query = `
    INSERT INTO 
        todo ("userId", title, description)
    VALUES 
        ($1, $2, $3) 
    RETURNING 
        id, 
        title, 
        description;`
    const parameters = [userId, title, description];
    const result = await dbClient.query(query,parameters);
    return result.rows[0];
}

const updateTodo = async (dbClient, userId, todoId, title, description) => {
    const query = `
    UPDATE 
        todo 
    SET 
        title = $1, 
        description = $2
    WHERE 
        id = $3 AND 
        "userId" = $4 
    RETURNING 
        id,
        title,
        description;`
    const parameters = [title, description, todoId, userId];
    const result = await dbClient.query(query,parameters);
    return result.rows[0];
}

const updateTitle = async (dbClient, userId, todoId, title) => {
    const query = `
    UPDATE 
        todo 
    SET 
        title = $1
    WHERE 
        id = $2 AND 
        "userId" = $3 
    RETURNING 
        id,
        title,
        description;`
    const parameters = [title, todoId, userId];
    const result = await dbClient.query(query,parameters);
    return result.rows[0];
}

const updateDescription = async (dbClient, userId, todoId, description) =>{
    const query = `
    UPDATE 
        todo 
    SET 
        description = $1
    WHERE 
        id = $2 AND 
        "userId" = $3 
    RETURNING 
        id,
        title,
        description;`
    const parameters = [description, todoId, userId];
    const result = await dbClient.query(query,parameters);
    return result.rows[0];
}

const getAll = async (dbClient, userId) => {
    const query = `
    SELECT 
        id, 
        title, 
        description 
    FROM 
        todo
    WHERE 
        "userId" = $1 AND 
        "isCompleted" = false;`
    const parameters = [userId];
    const result = await dbClient.query(query,parameters);
    return result.rows;
}

const markCompleted = async (dbClient, userId, todoId) => {
    const query = `
    UPDATE 
        todo 
    SET 
        "isCompleted" = true
    WHERE 
        id = $2 AND 
        "userId" = $1;`
    const parameters = [userId, todoId];
    await dbClient.query(query,parameters);
}

module.exports = { getOneByIdUser, insert, updateTodo, updateTitle, updateDescription, getAll, markCompleted }