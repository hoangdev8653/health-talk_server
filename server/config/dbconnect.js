// Sử dụng require thay vì import
require("dotenv/config");
const { Sequelize } = require("sequelize"); // Sử dụng require để nhập Sequelize

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    timezone: "+07:00",
  }
);

const dbconn = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection successfully ✅.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Thay đổi export từ `export default` thành `module.exports`
module.exports = dbconn;
