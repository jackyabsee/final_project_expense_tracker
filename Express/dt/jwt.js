"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJWT = exports.encodeJWT = exports.getJWTPayload = void 0;
const permit_1 = require("permit");
const http_error_1 = require("./http.error");
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const env_1 = require("./env");
const knex_1 = require("./knex");
const permit = new permit_1.Bearer({
    query: "access_token",
});
let knex = new knex_1.KnexContainer().createKnex();
function getJWTPayload(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let token;
        try {
            token = permit.check(req);
        }
        catch (error) {
            throw new http_error_1.HttpError(401, "missing jwt token");
        }
        if (!token) {
            throw new http_error_1.HttpError(401, "empty jwt token");
        }
        let payload;
        try {
            payload = jwt_simple_1.default.decode(token, env_1.env.JWT_SECRET);
        }
        catch (error) {
            throw new http_error_1.HttpError(403, "invalid jwt token");
        }
        // let user = proxy.user[payload.id];
        let user = yield knex("user").select("*").where({ id: payload.id }).first();
        if (!user) {
            throw new http_error_1.HttpError(404, "user not found");
        }
        yield knex("user")
            .update({
            last_online_time: new Date(),
        })
            .where({ id: payload.id });
        // user.last_online_time = toSqliteTimestamp(new Date())
        return payload;
    });
}
exports.getJWTPayload = getJWTPayload;
function encodeJWT(payload) {
    return jwt_simple_1.default.encode(payload, env_1.env.JWT_SECRET);
}
exports.encodeJWT = encodeJWT;
function decodeJWT(req) {
    let token;
    try {
        token = permit.check(req);
    }
    catch (error) {
        throw new http_error_1.HttpError(401, "missing jwt token");
    }
    if (!token) {
        throw new http_error_1.HttpError(401, "empty jwt token");
    }
    let payload;
    try {
        payload = jwt_simple_1.default.decode(token, env_1.env.JWT_SECRET);
    }
    catch (error) {
        throw new http_error_1.HttpError(403, "invalid jwt token");
    }
    return payload;
}
exports.decodeJWT = decodeJWT;
//# sourceMappingURL=jwt.js.map