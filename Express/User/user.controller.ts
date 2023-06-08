import { Request } from "express";
import { HttpController } from "./http.controller";
import { UserService } from "./user.service";
import "../session";
import { email, nullable, object, string } from "cast.ts";

let usernameParser = string({ match: /^[a-zA-Z]+[a-zA-Z0-9]*$/ });
let loginParser = object({
  account: usernameParser,
  password: string(),
});

let registerParser = object({
  account: usernameParser,
  password: string(),
  email: nullable(email()),
  username: usernameParser,
});
export class UserController extends HttpController {
  constructor(private userService: UserService) {
    super();
    this.router.post("/users/register", this.wrapMethod(this.register));
    this.router.post("/users/login", this.wrapMethod(this.login));
  }

  register = async (req: Request) => {
    req.body.email ||= null;
    let input = registerParser.parse(req.body);
    return this.userService.register(input);
  };

  login = async (req: Request) => {
    let input = loginParser.parse(req.body);
    return this.userService.login(input);
  };
}
