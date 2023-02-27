import { default as knex } from "knex";

export const config = {
  client: "pg",
  connection: process.env.POSTGRES_CONNECTION_STRING,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    schemaName: "authed",
    directory: "./src/db/migrations",
  },
};

const db = knex(config);
export default db;
