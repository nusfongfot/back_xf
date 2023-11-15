const connect_db = require("../connect_db");
const { DataTypes } = require("sequelize");

const ProductModel = connect_db.define("products", {
  pro_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  pro_name: {
    type: DataTypes.STRING,
  },
  pro_code: {
    type: DataTypes.BIGINT,
  },
  pro_price: {
    type: DataTypes.DOUBLE,
  },
  pro_description: {
    type: DataTypes.TEXT,
  },
  pro_images: {
    type: DataTypes.TEXT,
  },
});
// ProductModel.sync({ alter: true });
module.exports = ProductModel;
