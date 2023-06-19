import { Request } from "express";
import { AssetService } from "./asset.service";
import { HttpController } from "../http.controller";
import { number, object, string } from "cast.ts";
import { decodeJWT } from "../../jwt";

let addAssetParser = object({
  institution: string(),
  type: string(),
  value: number(),
  interest_rate: number(),
  remark: string(),
});

export class AssetController extends HttpController {
  constructor(private assetService: AssetService) {
    super();
    this.router.post("/assets", this.wrapMethod(this.addAsset));
    this.router.get("/assets", this.wrapMethod(this.loadAsset));
    this.router.get("/Assets/:id", this.wrapMethod(this.getAssetDetails));
    this.router.delete("/assets/:id", this.wrapMethod(this.deleteAsset));
  }

  loadAsset = async (req: Request) => {
    let decodeId = decodeJWT(req).id;
    let json = await this.assetService.loadAsset(decodeId);
    console.log(json);
    return json;
  };

  addAsset = async (req: Request) => {
    let user_id = decodeJWT(req).id;
    let input = addAssetParser.parse(req.body);
    console.log(input);
    let json = await this.assetService.addAsset({ ...input, user_id });
    return json;
  };

  getAssetDetails = async (req: Request) => {
    let user_id = decodeJWT(req).id;
    let id = +req.params.id;
    let json = await this.assetService.getAssetDetails({ id, user_id });

    return json;
  };

  deleteAsset = async (req: Request) => {
    let user_id = decodeJWT(req).id;
    let id = +req.params.id;
    let json = await this.assetService.deleteAsset({ id, user_id });
    return json;
  };
}
