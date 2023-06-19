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
    this.router.get("/assets/:id", this.wrapMethod(this.getAssetDetails));
    this.router.post("/editAsset", this.wrapMethod(this.editAsset));
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
    console.log("abcdefg");
    let user_id = decodeJWT(req).id;
    let id = +req.params.id;
    console.log(user_id, "+++++", id);
    let json = await this.assetService.getAssetDetails({ id, user_id });
    console.log("assetconrollllll::", json[0]);
    return json[0];
  };

  deleteAsset = async (req: Request) => {
    let user_id = decodeJWT(req).id;
    let id = +req.params.id;
    let json = await this.assetService.deleteAsset({ id, user_id });
    return json;
  };

  editAsset = async (req: Request) => {
    let asset = req.body;
    console.log("assssetcontroller:::", asset);
    let json = await this.assetService.editAsset(asset);
    console.log(json);
    return json;
  };
}
