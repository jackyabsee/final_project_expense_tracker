//import { number } from "cast.ts";
import { Knex } from "knex";

export class AssetService {
  constructor(private knex: Knex) {}

  //async getUser(): Promise<object[]> {
  //    return await this.knex.select('*').from('users');
  //}

  async loadAsset(userId: number) {
    let assets = await this.knex("asset")
      .select("id", "institution", "type", "value", "interest_rate", "remark")
      .where("user_id", userId)
      .orderBy("updated_at", "desc");

    console.log("loadAsset:", { userId, assets });
    return {
      assets,
    };
  }
  async addAsset(asset: {
    institution: string;
    type: string;
    value: number;
    interest_rate: number;
    remark: string;
    user_id: number;
  }) {
    console.log("add asset:", asset);
    let [{ id }] = await this.knex.insert(asset).into("asset").returning("id");
    return { id };
  }

  async getAssetDetails(filter: { id: number; user_id: number }) {
    console.log("edit asset:", filter);
    let json = await this.knex("asset").where(filter).select();
    console.log("edit asset:", json);
    return json;
  }

  async deleteAsset(filter: { id: number; user_id: number }) {
    console.log("delete asset:", filter);
    await this.knex("asset").where(filter).del();
    return {};
  }

  async editAsset(asset: any) {
    console.log("editassetservice::::::", asset);

    await this.knex("asset").where({ id: asset.id }).update({
      institution: asset.institution,
      type: asset.type,
      value: asset.value,
      interest_rate: asset.interest_rate,
      remark: asset.remark,
    });

    return asset.id;
  }
}
