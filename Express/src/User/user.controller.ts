import { Request } from "express";
import { UserService } from "./user.service";
import "../../session";
import { email, nullable, number, object, string } from "cast.ts";
import { HttpController } from "../http.controller";

let usernameParser = string({ match: /^[a-zA-Z]+[a-zA-Z0-9]*$/ });
let loginParser = object({
  account: usernameParser,
  password: string(),
});

let registerParser = object({
  account: usernameParser,
  password: string(),
  email: nullable(email()),
  username: nullable(usernameParser),
});

let getDataParser = object({
  userId: number(),
});
export class UserController extends HttpController {
  constructor(private userService: UserService) {
    super();
    this.router.post("/users/register", this.wrapMethod(this.register));
    this.router.post("/users/login", this.wrapMethod(this.login));
    this.router.get("/users/current-expense", this.wrapMethod(this.getData));
  }

  register = async (req: Request) => {
    req.body.email ||= null;
    req.body.username ||= null;
    let input = registerParser.parse(req.body);
    return this.userService.register(input);
  };

  login = async (req: Request) => {
    let input = loginParser.parse(req.body);
    return this.userService.login(input);
  };
  getData = async (req: Request) => {
    let input = getDataParser.parse(req.body);
    return this.userService.getData(input.userId);
  };
}
