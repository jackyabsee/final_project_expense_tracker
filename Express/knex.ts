import Knex from 'knex'
import { env } from './env'

let config = require('./knexfile')
let profile = config[env.NODE_ENV]

// console.debug('knex profile:', profile)

export class KnexContainer{
  createKnex() {
  let knex = Knex(profile)
  return knex
}
}