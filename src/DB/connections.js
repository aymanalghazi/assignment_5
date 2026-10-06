import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DataBase is connected");
  } catch (error) {
    console.log("DataBase is not connected ");
  }
};
export const synchronization = async () => {
  try {
    await sequelize.sync({ force: false , alter:false });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.log("errr synchronized  ");
  }
};
