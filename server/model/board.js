const { sq } = require("../config/db");
const { literal, DataTypes } = require("sequelize");
const User = require("../model/user");

const Board = sq.define("board", {
    board_id:{
      type: DataTypes.UUID,
      defaultValue: literal('gen_random_uuid()'),
      primaryKey: true,
    },
    board_title: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });
  
  Board.belongsTo(User, {foreignKey: 'user_id',allowNull: false, onDelete: 'CASCADE'});
  Board.sync().then(() => {
    console.log("Board Model synced");
  });
  
  module.exports = Board;