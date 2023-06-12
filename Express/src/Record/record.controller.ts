import { Request } from "express";
import { RecordService } from "./record.service";
import "../../session";
import { HttpController } from "../http.controller";

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
    let type = req.body.type;
    let price = req.body.price;
    let date = req.body.date;
    let remark = req.body.remark;
    let userId = req.body.userId;

    console.log("controller req.body:", req.body);

    let json = await this.recordService.quickRecord({
      type,
      price,
      date,
      remark,
      userId,
    });
    return json;
  };

  multiRecord = async (req: Request) => {
    const requestBody = req.body;
    console.log(requestBody);

    let json = await this.recordService.multiRecord(requestBody);
    return json;
  };
}
