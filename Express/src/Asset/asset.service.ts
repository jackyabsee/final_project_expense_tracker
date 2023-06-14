import { Knex } from "knex";

export class AssetService {
  constructor(private knex: Knex) {}

  //async getUser(): Promise<object[]> {
  //    return await this.knex.select('*').from('users');
  //}

  async loadAsset(userId: number) {
    let json = await this.knex("asset")
      .select("*")
      .where("user_id", userId)
      .orderBy("updated_at", "desc");

    console.log("assetservice: ", json);
    return json;
  }
  async addAsset(asset: {
    institution: string;
    type: string;
    value: number;
    interestRate: number;
    remark: string;
    userId: number;
  }) {
    let json = await this.knex
      .insert({
        institution: asset.institution,
        type: asset.type,
        value: asset.value,
        interest_rate: asset.interestRate,
        remark: asset.remark,
        user_id: asset.userId,
      })
      .into("asset")
      .returning("id");
    console.log("json in service: ", json);
    return json;
  }

  async deleteAsset(userId: number) {}
}
