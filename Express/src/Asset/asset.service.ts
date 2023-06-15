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

  async deleteAsset(filter: { id: number; user_id: number }) {
    console.log("delete asset:", filter);
    await this.knex("asset").where(filter).del();
    return {};
  }
}
