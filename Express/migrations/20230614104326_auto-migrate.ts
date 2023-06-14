import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("spending", (table) => {
    table.setNullable("remark");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("spending", (table) => {
    table.dropNullable("remark");
  });
}
