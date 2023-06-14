import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("asset", (table) => {
    table.specificType("interest_rate", "real").notNullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("asset", (table) => {
    table.string("interest_rate", 10).notNullable().alter();
  });
}
