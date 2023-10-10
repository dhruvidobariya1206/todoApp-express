const { pool } = require("../../../dbconn");
const dal = require("./dal");

const ifTodoExist = async (client, userId, todoId) => {
  const todo = await dal.getOneByIdUser(client, userId, todoId);
  return !!todo;
};

module.exports = {
  add: async (userId, title, description) => {
    const client = await pool.connect();
    try {
      const date = new Date();
      const todo = await dal.insert(client, userId, title, description, date);
      return todo;
    } finally {
      client.release();
    }
  },

  update: async (userId, todoId, title, description) => {
    const client = await pool.connect();

    try {
      const isValidTodo = await ifTodoExist(client, userId, todoId);
      if (!isValidTodo) {
        throw new Error("INVALID_DATA");
      }
      if (title && description) {
        const updatedTodo = await dal.updateTodo(
          client,
          userId,
          todoId,
          title,
          description
        );
        return updatedTodo;
      } else if (title) {
        const updatedTodo = await dal.updateTitle(
          client,
          userId,
          todoId,
          title
        );
        return updatedTodo;
      }
      const updatedTodo = await dal.updateDescription(
        client,
        userId,
        todoId,
        description
      );
      return updatedTodo;
    } finally {
      client.release();
    }
  },

  getAll: async (userId) => {
    const client = await pool.connect();
    try {
      const todos = await dal.getAll(client, userId);
      return todos;
    } finally {
      client.release();
    }
  },

  getOne: async (userId, todoId) => {
    const client = await pool.connect();
    try {
      const isValidTodo = await ifTodoExist(client, userId, todoId);
      if (!isValidTodo) {
        throw new Error("INVALID_DATA");
      }
      const todo = await dal.getOneByIdUser(client, userId, todoId);
      return todo;
    } finally {
      client.release();
    }
  },

  remove: async (userId, todoId) => {
    const client = await pool.connect();
    try {
      const isValidTodo = await ifTodoExist(client, userId, todoId);
      if (!isValidTodo) {
        throw new Error("INVALID_DATA");
      }
      dal.markCompleted(client, userId, todoId);
      return;
    } finally {
      client.release();
    }
  },

  get5DaysTodo: async () => {
    const client = await pool.connect();
    try {
      const todos = await dal.getByDate(client);
      if (!todos) {
        throw new Error("RESOURCE_NOT_FOUND");
      }
      // console.log(todos);
      return todos;
    } finally {
      client.release();
    }
  },
};
