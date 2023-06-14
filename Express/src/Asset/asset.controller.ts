import { Request } from "express";
import { AssetService } from "./asset.service";
import "../../session";
import { HttpController } from "../http.controller";
import { number, object, string } from "cast.ts";
import { decodeJWT } from "../../jwt";

let addAssetParser = object({
  institution: string(),
  type: string(),
  value: number(),
  interestRate: number(),
  remark: string(),
  userId: number(),
});

export class AssetController extends HttpController {
  constructor(private assetService: AssetService) {
    super();
    this.router.post("/addAsset", this.wrapMethod(this.addAsset));
    this.router.get("/loadAsset", this.wrapMethod(this.loadAsset));
    this.router.post("deleteAsset", this.wrapMethod(this.deleteAsset));
  }
  loadAsset = async (req: Request) => {
    let decodeId = await decodeJWT(req).id;
    console.log("decode:", decodeId);
    let json = await this.assetService.loadAsset(decodeId);
    const jsonArray = json.map((item) => [
      item.institution,
      item.type,
      item.value,
      item.interest_rate,
      item.remark,
    ]);
    console.log(jsonArray);
    return jsonArray;
  };

  addAsset = async (req: Request) => {
    console.log(req.body);
    let input = addAssetParser.parse(req.body);
    console.log("assetcontroller input:", input);

    let json = await this.assetService.addAsset(input);
    return json;
  };

  deleteAsset = async (req: Request) => {
    let decodeId = await decodeJWT(req).id;
    console.log("decode:", decodeId);
    let json = await this.assetService.loadAsset(decodeId);

    return json;
  };
}
