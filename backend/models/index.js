const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../db/db.sqlite"),
  logging: false,
});

(async () => {
  await sequelize.query("PRAGMA journal_mode = WAL;");
})();

const Todo = sequelize.define("Todo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("done", "undone"),
    allowNull: false,
    defaultValue: "undone",
  },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
});

module.exports = { sequelize, Todo };
