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
    DB_HOST: 'localhost',
    DB_PORT: 5432,
    DB_NAME: '',
    DB_USERNAME: '',
    DB_PASSWORD: '',
};
(0, populate_env_1.default)(exports.env, { mode: 'halt' });
//# sourceMappingURL=env.js.map