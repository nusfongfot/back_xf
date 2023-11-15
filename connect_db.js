const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_xsf", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
});
module.exports = sequelize;
