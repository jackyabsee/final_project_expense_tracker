import { Request } from "express";
import { Bearer } from "permit";
import { HttpError } from "./http.error";
import jwt from "jwt-simple";
import { env } from "./env";
// import { toSqliteTimestamp } from "better-sqlite3-proxy";
import { JWTPayload } from "./types";
import { KnexContainer } from "./knex";

const permit = new Bearer({
  query: "access_token",
});

let knex = new KnexContainer().createKnex();

export async function getJWTPayload(req: Request) {
  let token: string;
  try {
    token = permit.check(req);
  } catch (error) {
    throw new HttpError(401, "missing jwt token");
  }
  if (!token) {
    throw new HttpError(401, "empty jwt token");
  }

  let payload: JWTPayload;
  try {
    payload = jwt.decode(token, env.JWT_SECRET);
  } catch (error) {
    throw new HttpError(403, "invalid jwt token");
  }

  // let user = proxy.user[payload.id];
  let user = await knex("user").select("*").where({ id: payload.id }).first();
  if (!user) {
    throw new HttpError(404, "user not found");
  }
  await knex("user")
    .update({
      last_online_time: new Date(),
    })
    .where({ id: payload.id });

  // user.last_online_time = toSqliteTimestamp(new Date())

  return payload;
}

export function encodeJWT(payload: JWTPayload) {
  return jwt.encode(payload, env.JWT_SECRET);
}
