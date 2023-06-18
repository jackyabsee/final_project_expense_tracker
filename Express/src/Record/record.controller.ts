import { Request } from "express";
import { RecordService } from "./record.service";
import { HttpController } from "../http.controller";
import { date, nullable, number, object, string } from "cast.ts";
import { decodeJWT } from "../../jwt";

let quickRecordParser = object({
  type: string(),
  price: number({ min: 0 }),
  date: date(),
  remark: nullable(string()),
});

export class RecordController extends HttpController {
  constructor(private recordService: RecordService) {
    super();
    this.router.post("/quickRecordPost", this.wrapMethod(this.quickRecord));
    this.router.post("/multiRecordPost", this.wrapMethod(this.multiRecord));
  }

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

  quickRecord = async (req: Request) => {
    console.log(req.body);
    req.body.remark ||= null;
    let input = quickRecordParser.parse(req.body);
    console.log("controller req.body:", req.body);
    const realInput = {
      type: input.type,
      price: input.price,
      date: input.date,
      remark: input.remark,
      userId: decodeJWT(req).id,
    };
    let json = await this.recordService.quickRecord(realInput);
    return json;
  };

  multiRecord = async (req: Request) => {
    const requestBody = req.body;
    console.log(requestBody);

    let json = await this.recordService.multiRecord(requestBody);
    return json;
  };
}
