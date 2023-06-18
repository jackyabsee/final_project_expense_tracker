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
exports.UserService = void 0;
const hash_1 = require("../../hash");
const http_error_1 = require("../../http.error");
const http_status_1 = __importDefault(require("http-status"));
const jwt_1 = require("../../jwt");
class UserService {
    constructor(knex) {
        this.knex = knex;
    }
    register(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.knex
                .insert({
                account: input.account,
                password_hash: yield (0, hash_1.hashPassword)(input.password),
                email: input.email,
                username: input.username,
            })
                .into("user")
                .returning("id");
            console.log("register result: ", result);
            let id = result[0].id;
            let token = (0, jwt_1.encodeJWT)(this.genJWTPayload(id));
            return { token };
        });
    }
    login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.knex("user")
                .select("*")
                .where({ account: input.account })
                .first();
            if (!user)
                throw new http_error_1.HttpError(404, "User not found");
            let isMatched = yield (0, hash_1.comparePassword)({
                password: input.password,
                password_hash: user.password_hash,
            });
            if (!isMatched)
                throw new http_error_1.HttpError(http_status_1.default.UNAUTHORIZED, "Wrong username or password");
            let id = user.id;
            let token = (0, jwt_1.encodeJWT)(this.genJWTPayload(id));
            console.log({
                account: user.account,
                username: user.username,
            });
            return { token };
        });
    }
    getData(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            console.log("current month", currentMonth);
            let data = yield this.knex("spending")
                .select("type", "price", "date")
                .whereRaw(`EXTRACT(MONTH FROM date::date) = ? AND user_id = ?`, [
                currentMonth,
                input,
            ]);
            if (!data)
                throw new http_error_1.HttpError(404, "No data");
            const result = Object.values(data.reduce((acc, curr) => {
                if (acc[curr.type]) {
                    acc[curr.type].price += parseInt(curr.price);
                }
                else {
                    acc[curr.type] = { type: curr.type, price: parseInt(curr.price) };
                }
                return acc;
            }, {}));
            console.log("data", data);
            console.log("result", result);
            return { items: result };
        });
    }
    getExtraData() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.knex("content").select("*");
            if (!data)
                throw new http_error_1.HttpError(404, "No data");
            return { items: data };
        });
    }
    genJWTPayload(id) {
        return { id, iat: Math.floor(Date.now() / 1000) };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map