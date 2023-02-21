import "reflect-metadata"
import { DataSource } from "typeorm"

import { User, Token } from "./entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "foodtuck",
    synchronize: true,
    logging: false,
    entities: [User, Token],
    migrations: [],
    subscribers: [],
})
