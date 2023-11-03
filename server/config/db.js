const { Sequelize } = require("sequelize");

// Connection parameters
const sequelize = new Sequelize('BoardProject', 'postgres', 'rathisubhasish', {
    host: 'localhost',
    dialect: 'postgres'
  });

const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = { sq: sequelize, testDbConnection };