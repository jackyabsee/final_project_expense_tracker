import { Knex } from 'knex';
import { comparePassword, hashPassword } from '../hash'
import { HttpError } from '../http.error'

export class UserService {
    constructor(private knex: Knex) {}

    //async getUser(): Promise<object[]> {
    //    return await this.knex.select('*').from('users');
    //}
    
    async register(employee: {employeeName:string, email:string, password:string,phoneNumber:string,
        role:string,hireDate:Date,}) {
          let row = await this.knex('employee')
          .where('name', employee.employeeName)
          .orWhere('email', employee.email)
          .orWhere('phone_number', employee.phoneNumber)
          .select('*')

          if(row[0]){
            if (row[0].name === employee.employeeName) {
              return{ error: "Duplicate Username" };      
            } //check duplicate user name
            else if (row[0].email === employee.email) {
              console.log("DuUseremail");
      
              return{ error: "Duplicate Registered email" };
              
            } else if (row[0].phone_number === employee.phoneNumber) {
              console.log("phone");
      
              return{ error: "Duplicate Registered Phone No." };
              
            }
          } else if (employee.employeeName.length < 2){return{ error: "length of name should be more than 2 characters" };}
          else if (
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(employee.email) === false
          ) {
            console.log("Invalid email");
            return{ error: "Invalid email" };
            
          } else if (employee.password.length < 6) {
            console.log("Invalid password");
            return{ error: "Invalid password" };
            
          } else if (employee.phoneNumber.length < 8) {
            console.log("Invalid Phone Number");
            return{ error: "Invalid Phone Number" };
            
          } 
          
       
           await this.knex.insert({
              name: employee.employeeName,
              email: employee.email,
              password:await hashPassword(employee.password),
              phone_number:employee.phoneNumber,
              role:employee.role,
              hire_date:employee.hireDate,
              
            })
            .into('employee')
            .returning('id')
            console.log(await hashPassword(employee.password))
         // let id = rows[0].id
    //
         // return { id }

         return {"success":"Registered"}
        
      }

    //  async addStore(store:string){
    //    let row = await this.knex.select('name')
    //    .from('store')
    //    .where({name:store})
    //    .first()
//
    //    if(row){
    //      return 'duplicate Store Info'
    //    }
//
    //    await this.knex.insert({name:store}).into('store')
//
    //    return
    //  }

      async login(employee: { username: string; password: string }) {
        let row = await this.knex
          .select('*')
          .from('employee')
          .where({ name: employee.username })
          .first()
        console.log(row)
        if (!row) {
          return 'Invalid username/password'
        }
    
       let isPasswordMatched = await comparePassword({
         password: employee.password,
         password_hash: row.password,
       })
       if (!isPasswordMatched) {
         throw new HttpError(403, 'wrong username or password')
        console.log('incorrect')
       }
       console.log('role:', row.role, 'can login')
        return row
      }
}
