"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
const populate_env_1 = __importDefault(require("populate-env"));
(0, dotenv_1.config)();
exports.env = {
    PORT: 8130,
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
    exports.env.POSTGRES__DB = "skip";
    exports.env.POSTGRES__USER = "skip";
    exports.env.POSTGRES__PASSWORD = "skip";
    exports.env.POSTGRES__HOST = "skip";
}
(0, populate_env_1.default)(exports.env, { mode: "halt" });
//# sourceMappingURL=env.js.map