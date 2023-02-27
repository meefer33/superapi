import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", function (table) {
    table.uuid("id").primary().unique().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid("auth_id").unique().notNullable();
    table.string("email").notNullable();
  })
  .createTable("profile", function (table) {
    table.uuid("id").primary().unique().defaultTo(knex.raw('gen_random_uuid()'));
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.uuid('user_id').references('id').inTable('users').notNullable();
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("authed.profile").dropTable("users");
}
