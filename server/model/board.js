const { sq } = require("../config/db");
const { literal, DataTypes } = require("sequelize");
const User = require("../model/user");

const Board = sq.define("board", {
    board_id:{
      type: DataTypes.UUID,
      defaultValue: literal('gen_random_uuid()'),
      primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
           model: User, 
           key: 'user_id',
        }
    },
  });


  Board.sync().then(() => {
    console.log("Board Model synced");
  });

  User.hasMany(Board, {foreignKey: 'user_id'});
Board.hasOne(User, {foreignKey: 'user_id'});

  module.exports = Board;