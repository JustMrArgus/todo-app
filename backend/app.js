const express = require("express");
const path = require("path");

const todoRoutes = require("./routes/todo.routes");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

module.exports = app;
