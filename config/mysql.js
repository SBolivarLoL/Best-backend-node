const { Sequelize } = require("sequelize");

const mysqlDB = process.env.MYSQL_NAME;
const mysqluser = process.env.MYSQL_USER;
const mysqlpass = process.env.MYSQL_PASS;
const mysqlhost = process.env.MYSQL_HOST;

/* Creating a new instance of Sequelize. */
const sequelize = new Sequelize(mysqlDB, mysqluser, mysqlpass, {
  host: mysqlhost,
  dialect: "mysql",
});

/**
 * This function will attempt to connect to the MySQL database, and if it fails, it will log the error
 * to the console.
 */
const mysqlDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = { sequelize, mysqlDbConnection };
