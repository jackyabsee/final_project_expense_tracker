import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("spending", (table) => {
    table.specificType("price", "real").notNullable().alter();
  });
  await knex.schema.alterTable("asset", (table) => {
    table.specificType("value", "real").notNullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("asset", (table) => {
    table.string("value", 10).notNullable().alter();
  });
  await knex.schema.alterTable("spending", (table) => {
    table.string("price", 10).notNullable().alter();
  });
}
