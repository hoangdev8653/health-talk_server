require("dotenv/config");
const { Sequelize } = require("sequelize"); 

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
    console.log('Kết nối DB thành công ✅.');
  } catch (error) {
    console.error('Kết nối DB thất bại:', error);
  }
};

module.exports = dbconn;
