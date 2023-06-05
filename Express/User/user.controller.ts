import  { Request } from 'express';
import { HttpController } from './http.controller'
import { UserService } from './user.service';
import '../session'
    
export class UserController extends HttpController {
    constructor(private userService: UserService) {
      super()
      this.router.get('/register', this.wrapMethod(this.register));
      this.router.post('/regusertest', this.wrapMethod(this.register))
      this.router.post('/login',this.wrapMethod(this.login))
   //   this.router.post('/addStore', this.wrapMethod(this.addStore))
    }
    
    //login = async (req: express.Request, res: express.Response) => {
    //
    //    try{
    //        let user = await this.userService.getUser();
    //        return res.status(200).json({ status: true, data: user })
    //    }
    //    catch(err:any){
    //        return res.status(200).json({ status: false })
    //    }
    //        
    //};

    register = async (req: Request) => {
        let employeeName = req.body.employeeName;
        let email = req.body.email;
        let password = req.body.password;
        let phoneNumber = req.body.phoneNumber;
        let role = req.body.role;
        let hireDate = req.body.hireDate;
        console.log(req.body)
    //         const { employeeName, email, password, phoneNumber, role, hireDate, storeId } = req.body
             let json = await this.userService.register({ employeeName, email, password,phoneNumber,role,hireDate })
    //     //    req.session.user = {
    //     //      id: json.id,
    //     //      username,
    //     //    }
          // return json
          console.log({ status: true, data: json })
          return json
     }

   //  addStore = async (req: Request) => {
   //   let store = req.body.store
   //   let json = await this.userService.addStore(store)
   //   if(json === 'duplicate Store Info'){
   //     return 'duplicate Store Info'
   //   }
//
   //   return 
   //  }
    
     login = async (req: Request) => {
    //    let {
    //      body: { username, password },
    //    } = userAuthParser.parse(req)
    console.log("controller tries to login")
    let username = req.body.username
    let password = req.body.password
    console.log("controller",username,password)
        let json = await this.userService.login({ username, password })
        
        if(json === 'Invalid username/password'){
          return 'Invalid username/password'
        }
      //  if(json == 'wrong username'){
      //      return res.status(401).json({Error: 'Incorrect username'})
      //     }
      //     if(json == 'wrong password'){
      //      return res.status(401).json({Error: 'Incorrect password'})
      //     }
        req.session.user = {
          id: json.id,
          username:json.name,
          role:json.role,
          login: true,
        }
       console.log("get session: ", req.session.user)
      
       return { status: true, data: json }
    }

    // hasLoggedIn = async (req: Request) => {
    //   if (req.session.user?.login) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
    //  getCurrentRole(req: Request) {
    //    return { user: req.session.user }
    //  }
}