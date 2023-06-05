import { Knex } from "knex";
import { comparePassword, hashPassword } from "../hash";
import { HttpError } from "../http.error";

export class UserService {
  constructor(private knex: Knex) {}

  async register() {}

  async login() {}
}
