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
exports.AppServer = void 0;
const express_1 = __importDefault(require("express"));
const session_1 = require("./session");
const http_1 = __importDefault(require("http"));
// import { employeeRoutes } from './employeeTime/employee.routes'
const knex_1 = require("./knex");
const user_service_1 = require("./src/User/user.service");
const user_controller_1 = require("./src/User/user.controller");
const listening_on_1 = require("listening-on");
const http_error_1 = require("./http.error");
const cors_1 = __importDefault(require("cors"));
const record_service_1 = require("./src/Record/record.service");
const record_controller_1 = require("./src/Record/record.controller");
const asset_service_1 = require("./src/Asset/asset.service");
const asset_controller_1 = require("./src/Asset/asset.controller");
// import { isAdmin, isUser } from './guard';
class AppServer {
    constructor() {
        let app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(session_1.sessionMiddleware);
        let server = new http_1.default.Server(app);
        this.knex = new knex_1.KnexContainer().createKnex();
        // let io = new socketIO.Server(server)
        app.use(express_1.default.static("public"));
        // app.use(express.static('public'))
        // app.use(isAdmin,express.static('adminPage'))
        // app.use(isUser,express.static('private'))
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(session_1.sessionMiddleware);
        let userService = new user_service_1.UserService(this.knex);
        let userController = new user_controller_1.UserController(userService);
        let recordService = new record_service_1.RecordService(this.knex);
        let recordController = new record_controller_1.RecordController(recordService);
        let assetService = new asset_service_1.AssetService(this.knex);
        let assetController = new asset_controller_1.AssetController(assetService);
        app.use(recordController.router);
        app.use(userController.router);
        app.use(assetController.router);
        //let memoUploader = new MemoUploader()
        //
        //let userService = new UserService(knex)
        //let memoService = new MemoService(knex, memoUploader)
        //
        //let userController = new UserController(userService)
        //app.use(userController.router)
        //
        //let memoController = new MemoController(memoService, memoUploader, io)
        //app.use(memoController.router)
        app.use((error, req, res, next) => {
            http_error_1.HttpError.endResponse(error, res);
        });
        app.use((req, res, next) => {
            res.status(404);
            res.json({ error: "Route not found" });
        });
        this.server = server;
        // this.knex = knex
    }
    start(port) {
        this.server.listen(port, () => {
            (0, listening_on_1.print)(port);
        });
    }
    stopHttpServer() {
        return new Promise((resolve, reject) => {
            this.server.close((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.stopHttpServer();
            yield this.knex.destroy();
        });
    }
}
exports.AppServer = AppServer;
//# sourceMappingURL=server.js.map