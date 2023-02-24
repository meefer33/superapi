import { default as knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

export const config = {
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST as string,
    port: process.env.POSTGRES_PORT as string,
    database: process.env.POSTGRES_DB as string,
    user: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/db/migrations",
  },
};

const db = knex(config);
export default db;
