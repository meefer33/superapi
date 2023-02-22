import { default as knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

export const config = {
  client: "pg",
  connection: {
    host: process.env.POSTGRESQL_HOST as string,
    port: process.env.POSTGRESQL_PORT as string,
    database: process.env.POSTGRESQL_DB as string,
    user: process.env.POSTGRESQL_USER as string,
    password: process.env.POSTGRESQL_PASSWORD as string,
    ssl: { rejectUnauthorized: false },
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
