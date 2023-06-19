import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("asset", (table) => {
    table.dropColumn("category");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("asset", (table) => {
    table.string("category");
  });
}
