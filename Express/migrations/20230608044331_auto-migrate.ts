import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("user"))) {
    await knex.schema.createTable("user", (table) => {
      table.increments("id");
      table.string("account", 32).notNullable().unique();
      table.string("email", 255).notNullable();
      table.string("password_hash", 60).notNullable();
      table.string("username", 32).notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("spending"))) {
    await knex.schema.createTable("spending", (table) => {
      table.increments("id");
      table.string("type", 20).notNullable();
      table.string("price", 10).notNullable();
      table.date("date").notNullable();
      table.string("remark", 255).notNullable();
      table.integer("user_id").unsigned().notNullable().references("user.id");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("asset"))) {
    await knex.schema.createTable("asset", (table) => {
      table.increments("id");
      table.string("category", 10).notNullable();
      table.string("organization", 12).notNullable();
      table.string("type", 12).notNullable();
      table.string("value", 10).notNullable();
      table.float("interest_rate", 10).notNullable();
      table.string("remark", 255).notNullable();
      table.integer("user_id").unsigned().notNullable().references("user.id");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("content"))) {
    await knex.schema.createTable("content", (table) => {
      table.increments("id");
      table.string("title", 40).notNullable();
      table.string("url", 255).notNullable();
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("content");
  await knex.schema.dropTableIfExists("asset");
  await knex.schema.dropTableIfExists("spending");
  await knex.schema.dropTableIfExists("user");
}
