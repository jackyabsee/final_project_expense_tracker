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
exports.AssetService = void 0;
class AssetService {
    constructor(knex) {
        this.knex = knex;
    }
    //async getUser(): Promise<object[]> {
    //    return await this.knex.select('*').from('users');
    //}
    loadAsset(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let assets = yield this.knex("asset")
                .select("id", "institution", "type", "value", "interest_rate", "remark")
                .where("user_id", userId)
                .orderBy("updated_at", "desc");
            console.log("loadAsset:", { userId, assets });
            return {
                assets,
            };
        });
    }
    addAsset(asset) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("add asset:", asset);
            let [{ id }] = yield this.knex.insert(asset).into("asset").returning("id");
            return { id };
        });
    }
    getAssetDetails(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("edit asset:", filter);
            let json = yield this.knex("asset").where(filter).select();
            console.log("edit asset:", filter);
            return json;
        });
    }
    deleteAsset(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("delete asset:", filter);
            yield this.knex("asset").where(filter).del();
            return {};
        });
    }
}
exports.AssetService = AssetService;
//# sourceMappingURL=asset.service.js.map