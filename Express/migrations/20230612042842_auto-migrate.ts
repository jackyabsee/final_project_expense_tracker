import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', table => {
    table.serial('id').notNullable().alter()
    table.unique(['id'])
  })
  await knex.schema.alterTable('spending', table => {
    table.serial('id').notNullable().alter()
    table.unique(['id'])
  })
  await knex.schema.alterTable('asset', table => {
    table.serial('id').notNullable().alter()
    table.unique(['id'])
    table.string('interest_rate', 10).notNullable().alter()
  })
  await knex.schema.alterTable('content', table => {
    table.serial('id').notNullable().alter()
    table.unique(['id'])
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('content', table => {
    table.dropUnique(['id'])
    table.integer('id').notNullable().alter()
  })
  await knex.schema.alterTable('asset', table => {
    table.specificType('interest_rate', 'real').notNullable().alter()
    table.dropUnique(['id'])
    table.integer('id').notNullable().alter()
  })
  await knex.schema.alterTable('spending', table => {
    table.dropUnique(['id'])
    table.integer('id').notNullable().alter()
  })
  await knex.schema.alterTable('user', table => {
    table.dropUnique(['id'])
    table.integer('id').notNullable().alter()
  })
}
