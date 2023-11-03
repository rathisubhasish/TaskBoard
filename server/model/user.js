const { sq } = require("../config/db");
const { literal, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

const User = sq.define("user", {
    user_id:{
      type: DataTypes.UUID,
      defaultValue: literal('gen_random_uuid()'),
      primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
   hooks: {
    beforeCreate: async (user) => {
     if (user.password) {
      const salt = await bcrypt.genSaltSync(10, 'a');
      user.password = bcrypt.hashSync(user.password, salt);
     }
    },
    beforeUpdate:async (user) => {
     if (user.password) {
      const salt = await bcrypt.genSaltSync(10, 'a');
      user.password = bcrypt.hashSync(user.password, salt);
     }
    }
   },
   instanceMethods: {
    validPassword: (password) => {
     return bcrypt.compareSync(password, this.password);
    }
   }
  });

  User.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
   }

  User.sync().then(() => {
    console.log("User Model synced");
  });


  module.exports = User;