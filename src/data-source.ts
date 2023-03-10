import "reflect-metadata"
import { DataSource } from "typeorm"

import { User, Token, Product } from "./entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "foodtuck",
    synchronize: true,
    logging: false,
    entities: [User, Product, Token],
    migrations: [],
    ssl: process.env.NODE_ENV === "production" ? {
      rejectUnauthorized: false,
    } : false,
    subscribers: [],
})
