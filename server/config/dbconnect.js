const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    "postgresql://health_talk_user:YEBXgfR7LZTmzKNp2vWqZTda9dGHn4SH@dpg-d1ao1cuuk2gs738v3gp0-a.singapore-postgres.render.com/health_talk",
  {
    dialect: "postgres",
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
