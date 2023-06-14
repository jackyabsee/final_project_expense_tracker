import { Knex } from "knex";

export class RecordService {
  constructor(private knex: Knex) {}

  //async getUser(): Promise<object[]> {
  //    return await this.knex.select('*').from('users');
  //}
  async quickRecord(Record: {
    type: string;
    price: number;
    date: Date;
    remark: string | null;
    userId: number;
  }) {
    let json = await this.knex
      .insert({
        type: Record.type,
        price: Record.price,
        date: Record.date,
        remark: Record.remark,
        user_id: Record.userId,
      })
      .into("spending")
      .returning("id");
    console.log("json in service: ", json);
    return json;
  }

  async multiRecord(req: Request) {
    try {
      console.log(req);
      for (let eachRecord of req as any) {
        await this.knex
          .insert({
            type: eachRecord[0],
            price: eachRecord[1],
            date: eachRecord[2],
            remark: eachRecord[3],
            user_id: eachRecord[4],
          })
          .into("spending");
        console.log("pogo");
      }
      return "abc";
    } catch (err) {
      return err;
    }
  }
}
