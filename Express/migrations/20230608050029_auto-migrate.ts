import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("user", (table) => {
    table.unique(["email"]);
    table.setNullable("email");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("user", (table) => {
    table.dropNullable("email");
    table.dropUnique(["email"]);
  });
}
