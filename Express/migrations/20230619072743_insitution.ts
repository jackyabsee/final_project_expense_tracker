import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("asset", (table) => {
    table.renameColumn("organization", "institution");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("asset", (table) => {
    table.renameColumn("institution", "organization");
  });
}
