import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Task } from "./entity/Task"
import { config } from "dotenv";
config(); 

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

const PORT: number = parseInt(DB_PORT || "", 10); 

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    ssl: {
      rejectUnauthorized: false
  },
    synchronize: true,
    logging: false,
    entities: [User, Task],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected")

    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
    });