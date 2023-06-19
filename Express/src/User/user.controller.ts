import { Request } from "express";
import { UserService } from "./user.service";
import { email, nullable, number, object, string } from "cast.ts";
import { HttpController } from "../http.controller";
import { decodeJWT } from "../../jwt";

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
let deleteHistoryItemParser = object({
  id: number(),
});

export class UserController extends HttpController {
  constructor(private userService: UserService) {
    super();
    this.router.post("/users/register", this.wrapMethod(this.register));
    this.router.post("/users/login", this.wrapMethod(this.login));
    this.router.get("/users/current-expense", this.wrapMethod(this.getData));
    this.router.get("/users/extra-data", this.wrapMethod(this.getExtraData));
    this.router.get("/users/history", this.wrapMethod(this.getHistory));
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
    let id = decodeJWT(req).id;
    return this.userService.getData(id);
  };
  getExtraData = async (req: Request) => {
    return this.userService.getExtraData();
  };
  getHistory = async (req: Request) => {
    let id = decodeJWT(req).id;
    return this.userService.getHistory(id);
  };
  deleteHistoryItem = async (req: Request) => {
    let user_id = decodeJWT(req).id;
    let itemId = deleteHistoryItemParser.parse(req.body);
    return this.userService.deleteHistoryItem({ id: itemId.id, user_id });
  };
}
