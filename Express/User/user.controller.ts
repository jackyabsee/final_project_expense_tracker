import { Request } from "express";
import { HttpController } from "./http.controller";
import { UserService } from "./user.service";
import "../session";

export class UserController extends HttpController {
  constructor(private userService: UserService) {
    super();
    this.router.get("/register", this.wrapMethod(this.register));
    this.router.post("/login", this.wrapMethod(this.login));
  }

  register = async (req: Request) => {};

  login = async (req: Request) => {};
}
