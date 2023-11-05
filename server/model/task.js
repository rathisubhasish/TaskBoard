const { sq } = require("../config/db");
const { literal, DataTypes } = require("sequelize");
const Board = require("./board");

const Task = sq.define("task", {
    task_id:{
      type: DataTypes.UUID,
      defaultValue: literal('gen_random_uuid()'),
      primaryKey: true,
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });

  Task.belongsTo(Board, {foreignKey: 'board_id',allowNull: false, onDelete: 'CASCADE'});
  Task.sync().then(() => {
    console.log("Task Model synced");
  });

  module.exports = Task;