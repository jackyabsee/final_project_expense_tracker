import { Knex } from "knex";
import { comparePassword, hashPassword } from "../../hash";
import { HttpError } from "../../http.error";
import { JWTPayload, LoginInput, RegisterInput } from "../../types";
import httpStatus from "http-status";
import { encodeJWT } from "../../jwt";

export class UserService {
  constructor(private knex: Knex) {}

  async register(input: RegisterInput) {
    let result = await this.knex
      .insert({
        account: input.account,
        password_hash: await hashPassword(input.password),
        email: input.email,
        username: input.username,
      })
      .into("user")
      .returning("id");
    console.log("register result: ", result);

    let id = result[0].id;
    let token = encodeJWT(this.genJWTPayload(id));
    return { token };
  }

  async login(input: LoginInput) {
    let user = await this.knex("user")
      .select("*")
      .where({ account: input.account })
      .first();
    if (!user) throw new HttpError(404, "User not found");
    let isMatched = await comparePassword({
      password: input.password,
      password_hash: user.password_hash,
    });
    if (!isMatched)
      throw new HttpError(
        httpStatus.UNAUTHORIZED,
        "Wrong username or password"
      );
    let id = user.id;
    let token = encodeJWT(this.genJWTPayload(id));
    console.log({
      account: user.account,
      username: user.username,
    });

    return { token };
  }
  async getData(input: number) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    console.log("current month", currentMonth);

    let data = await this.knex("spending")
      .select("type", "price", "date")
      .whereRaw(`EXTRACT(MONTH FROM date::date) = ? AND user_id = ?`, [
        currentMonth,
        input,
      ]);

    if (!data) throw new HttpError(404, "No data");
    const result = Object.values(
      data.reduce((acc, curr) => {
        if (acc[curr.type]) {
          acc[curr.type].price += parseInt(curr.price);
        } else {
          acc[curr.type] = { type: curr.type, price: parseInt(curr.price) };
        }

        return acc;
      }, {})
    );
    console.log("data", data);

    console.log("result", result);
    return { items: result };
  }

  async getExtraData() {
    let data = await this.knex("content").select("*");
    if (!data) throw new HttpError(404, "No data");
    return { items: data };
  }

  private genJWTPayload(id: number): JWTPayload {
    return { id, iat: Math.floor(Date.now() / 1000) };
  }
}
