const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_URL,

  {
    dialect: process.env.DB_DIALECT,
    logging: false,
    dialectOptions: {
      ssl: process.env.DATABASE_URL
        ? { require: true, rejectUnauthorized: false }
        : false,
    },
    timezone: "+07:00",
  }
);

const dbconn = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Kết nối DB thành công.");
  } catch (error) {
    console.error("❌ Kết nối DB thất bại:", error);
  }
};

module.exports = dbconn;
