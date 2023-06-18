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
exports.RecordService = void 0;
class RecordService {
    constructor(knex) {
        this.knex = knex;
    }
    //async getUser(): Promise<object[]> {
    //    return await this.knex.select('*').from('users');
    //}
    quickRecord(Record) {
        return __awaiter(this, void 0, void 0, function* () {
            let json = yield this.knex
                .insert({
                type: Record.type,
                price: Record.price,
                date: Record.date,
                remark: Record.remark,
                user_id: Record.userId,
            })
                .into("spending")
                .returning("id");
            console.log("json in service: ", json);
            return json;
        });
    }
    multiRecord(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req);
                for (let eachRecord of req) {
                    yield this.knex
                        .insert({
                        type: eachRecord[0],
                        price: eachRecord[1],
                        date: eachRecord[2],
                        remark: eachRecord[3],
                        user_id: eachRecord[4],
                    })
                        .into("spending");
                    console.log("pogo");
                }
                return "abc";
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.RecordService = RecordService;
//# sourceMappingURL=record.service.js.map