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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
require("../../session");
const cast_ts_1 = require("cast.ts");
const http_controller_1 = require("../http.controller");
const jwt_1 = require("../../jwt");
let usernameParser = (0, cast_ts_1.string)({ match: /^[a-zA-Z]+[a-zA-Z0-9]*$/ });
let loginParser = (0, cast_ts_1.object)({
    account: usernameParser,
    password: (0, cast_ts_1.string)(),
});
let registerParser = (0, cast_ts_1.object)({
    account: usernameParser,
    password: (0, cast_ts_1.string)(),
    email: (0, cast_ts_1.nullable)((0, cast_ts_1.email)()),
    username: (0, cast_ts_1.nullable)(usernameParser),
});
class UserController extends http_controller_1.HttpController {
    constructor(userService) {
        super();
        this.userService = userService;
        this.register = (req) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            (_a = req.body).email || (_a.email = null);
            (_b = req.body).username || (_b.username = null);
            let input = registerParser.parse(req.body);
            return this.userService.register(input);
        });
        this.login = (req) => __awaiter(this, void 0, void 0, function* () {
            let input = loginParser.parse(req.body);
            return this.userService.login(input);
        });
        this.getData = (req) => __awaiter(this, void 0, void 0, function* () {
            let id = (0, jwt_1.decodeJWT)(req).id;
            return this.userService.getData(id);
        });
        this.getExtraData = (req) => __awaiter(this, void 0, void 0, function* () {
            return this.userService.getExtraData();
        });
        this.router.post("/users/register", this.wrapMethod(this.register));
        this.router.post("/users/login", this.wrapMethod(this.login));
        this.router.get("/users/current-expense", this.wrapMethod(this.getData));
        this.router.get("/users/extra-data", this.wrapMethod(this.getExtraData));
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map