import { config } from "dotenv";
import populateEnv from "populate-env";

config();

export let env = {
  PORT: 8100,
  NODE_ENV: "development",
  //for development and production
  DB_HOST: "localhost",
  DB_PORT: 5432,
  DB_NAME: "",
  DB_USERNAME: "",
  DB_PASSWORD: "",
  JWT_SECRET: "",
  //test
  TEST_DB_NAME: "",
  TEST_DB_USER: "",
  TEST_DB_PASSWORD: "",
  //CI
  POSTGRES__DB: "",
  POSTGRES__USER: "",
  POSTGRES__PASSWORD: "",
  POSTGRES__HOST: "",
  POSTGRES__PORT: 5432,
};

if (process.env.NODE_ENV !== "ci") {
  env.POSTGRES__DB = "skip";
  env.POSTGRES__USER = "skip";
  env.POSTGRES__PASSWORD = "skip";
  env.POSTGRES__HOST = "skip";
}

populateEnv(env, { mode: "halt" });
