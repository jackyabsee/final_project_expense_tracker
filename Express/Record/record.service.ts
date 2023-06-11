import { Knex } from 'knex';


export class RecordService {
    constructor(private knex: Knex) {}

    //async getUser(): Promise<object[]> {
    //    return await this.knex.select('*').from('users');
    //}
    async quickRecord(Record: {type:string, price:string, date:Date, remark:string, userId:string }){
      await this.knex.insert({
        type: Record.type,
        price: Record.price,
        date:Record.date,
        remark:Record.remark,
        userId:Record.userId,
        
      })
      .into('spending')
      .returning('id')

      
    }

    async multiRecord(req: Request){
      try {
        console.log(req.body);
       // for (let e of req.body as any) {
       //     await this.knex.insert({
       //         'employee_id': user_id,
       //         'date': e.date,
       //         'section': e.section,
       //         'available': e.available
       //     }).into("working_time")
       //     console.log("pogo")
       // }
        return "abc"
    }
    catch (err) {
        
        return err
    }
    }
}
