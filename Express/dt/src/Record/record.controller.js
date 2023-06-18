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
exports.RecordController = void 0;
require("../../session");
const http_controller_1 = require("../http.controller");
const cast_ts_1 = require("cast.ts");
const jwt_1 = require("../../jwt");
let quickRecordParser = (0, cast_ts_1.object)({
    type: (0, cast_ts_1.string)(),
    price: (0, cast_ts_1.number)({ min: 0 }),
    date: (0, cast_ts_1.date)(),
    remark: (0, cast_ts_1.nullable)((0, cast_ts_1.string)()),
});
class RecordController extends http_controller_1.HttpController {
    constructor(recordService) {
        super();
        this.recordService = recordService;
        //login = async (req: express.Request, res: express.Response) => {
        //
        //    try{
        //        let user = await this.userService.getUser();
        //        return res.status(200).json({ status: true, data: user })
        //    }
        //    catch(err:any){
        //        return res.status(200).json({ status: false })
        //    }
        //
        //};
        this.quickRecord = (req) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log(req.body);
            (_a = req.body).remark || (_a.remark = null);
            let input = quickRecordParser.parse(req.body);
            console.log("controller req.body:", req.body);
            const realInput = {
                type: input.type,
                price: input.price,
                date: input.date,
                remark: input.remark,
                userId: (0, jwt_1.decodeJWT)(req).id,
            };
            let json = yield this.recordService.quickRecord(realInput);
            return json;
        });
        this.multiRecord = (req) => __awaiter(this, void 0, void 0, function* () {
            const requestBody = req.body;
            console.log(requestBody);
            let json = yield this.recordService.multiRecord(requestBody);
            return json;
        });
        this.router.post("/quickRecordPost", this.wrapMethod(this.quickRecord));
        this.router.post("/multiRecordPost", this.wrapMethod(this.multiRecord));
    }
}
exports.RecordController = RecordController;
//# sourceMappingURL=record.controller.js.map