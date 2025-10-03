const { Todo } = require("../models/todo");

exports.createTodo = async (req, res) => {
  try {
    const { name, status, priority, dueDate } = req.body;

    const todo = await Todo.create({
      name,
      status,
      priority,
      dueDate,
    });

    res.status(201).json({
      data: todo,
      status: 1,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, status: 0 });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json({ data: todos, status: 1 });
  } catch (err) {
    res.status(500).json({ message: err.message, status: 0 });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: "Task not found", status: 0 });
    }

    res.json({ data: todo, status: 1 });
  } catch (err) {
    res.status(500).json({ message: err.message, status: 0 });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, priority, dueDate } = req.body;

    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: "Task not found", status: 0 });
    }

    await todo.update({ name, status, priority, dueDate });
    res.json({ data: todo, status: 1 });
  } catch (err) {
    res.status(500).json({ message: err.message, status: 0 });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: "Task not found", status: 0 });
    }

    await todo.destroy();
    res.json({ status: 1 });
  } catch (err) {
    res.status(500).json({ message: err.message, status: 0 });
  }
};
