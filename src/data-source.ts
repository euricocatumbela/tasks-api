import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Task } from "./entity/Task"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "task-db-instance.c7iy5ull9gcc.us-east-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    // password: "Cat47306!",
    password: "postgress",
    database: "initial_db",
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
        // here you can start to work with your database
        console.log("Database connected")

    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
    });