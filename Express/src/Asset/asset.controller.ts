import { Request } from "express";
import { AssetService } from "./asset.service";
import "../../session";
import { HttpController } from "../http.controller";
import { number, object, string } from "cast.ts";

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
  }

  addAsset = async (req: Request) => {
    console.log(req.body);
    let input = addAssetParser.parse(req.body);
    console.log("assetcontroller input:", input);

    let json = await this.assetService.addAsset(input);
    return json;
  };


}
