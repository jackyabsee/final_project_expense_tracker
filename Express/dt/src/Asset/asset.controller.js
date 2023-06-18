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
exports.AssetController = void 0;
require("../../session");
const http_controller_1 = require("../http.controller");
const cast_ts_1 = require("cast.ts");
const jwt_1 = require("../../jwt");
let addAssetParser = (0, cast_ts_1.object)({
    institution: (0, cast_ts_1.string)(),
    type: (0, cast_ts_1.string)(),
    value: (0, cast_ts_1.number)(),
    interest_rate: (0, cast_ts_1.number)(),
    remark: (0, cast_ts_1.string)(),
});
class AssetController extends http_controller_1.HttpController {
    constructor(assetService) {
        super();
        this.assetService = assetService;
        this.loadAsset = (req) => __awaiter(this, void 0, void 0, function* () {
            let decodeId = (0, jwt_1.decodeJWT)(req).id;
            let json = yield this.assetService.loadAsset(decodeId);
            return json;
        });
        this.addAsset = (req) => __awaiter(this, void 0, void 0, function* () {
            let user_id = (0, jwt_1.decodeJWT)(req).id;
            let input = addAssetParser.parse(req.body);
            let json = yield this.assetService.addAsset(Object.assign(Object.assign({}, input), { user_id }));
            return json;
        });
        this.getAssetDetails = (req) => __awaiter(this, void 0, void 0, function* () {
            let user_id = (0, jwt_1.decodeJWT)(req).id;
            let id = +req.params.id;
            let json = yield this.assetService.getAssetDetails({ id, user_id });
            return json;
        });
        this.deleteAsset = (req) => __awaiter(this, void 0, void 0, function* () {
            let user_id = (0, jwt_1.decodeJWT)(req).id;
            let id = +req.params.id;
            let json = yield this.assetService.deleteAsset({ id, user_id });
            return json;
        });
        this.router.post("/assets", this.wrapMethod(this.addAsset));
        this.router.get("/assets", this.wrapMethod(this.loadAsset));
        this.router.get("/Assets/:id", this.wrapMethod(this.getAssetDetails));
        this.router.delete("/assets/:id", this.wrapMethod(this.deleteAsset));
    }
}
exports.AssetController = AssetController;
//# sourceMappingURL=asset.controller.js.map