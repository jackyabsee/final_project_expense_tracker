import express, { NextFunction, Request, Response } from "express";
import { sessionMiddleware } from "./session";
import http from "http";
import { Knex } from "knex";
// import { employeeRoutes } from './employeeTime/employee.routes'
import { KnexContainer } from "./knex";
import { UserService } from "./src/User/user.service";
import { UserController } from "./src/User/user.controller";
import { print } from "listening-on";
import { HttpError } from "./http.error";
import cors from "cors";
import { RecordService } from "./src/Record/record.service";
import { RecordController } from "./src/Record/record.controller";
import { AssetService } from "./src/Asset/asset.service";
import { AssetController } from "./src/Asset/asset.controller";

// import { isAdmin, isUser } from './guard';

export class AppServer {
  private server: http.Server;
  public readonly knex: Knex;
  constructor() {
    let app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(sessionMiddleware);
    let server = new http.Server(app);
    this.knex = new KnexContainer().createKnex();
    // let io = new socketIO.Server(server)

    app.use(express.static("public"));

    // app.use(express.static('public'))
    // app.use(isAdmin,express.static('adminPage'))
    // app.use(isUser,express.static('private'))
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(sessionMiddleware);

    let userService = new UserService(this.knex);
    let userController = new UserController(userService);
    let recordService = new RecordService(this.knex);
    let recordController = new RecordController(recordService);
    let assetService = new AssetService(this.knex);
    let assetController = new AssetController(assetService);
    app.use(recordController.router);
    app.use(userController.router);
    app.use(assetController.router)

    //let memoUploader = new MemoUploader()
    //
    //let userService = new UserService(knex)
    //let memoService = new MemoService(knex, memoUploader)
    //
    //let userController = new UserController(userService)
    //app.use(userController.router)
    //
    //let memoController = new MemoController(memoService, memoUploader, io)
    //app.use(memoController.router)

    app.use(
      (error: HttpError, req: Request, res: Response, next: NextFunction) => {
        HttpError.endResponse(error, res);
      }
    );

    app.use((req, res, next) => {
      res.status(404);
      res.json({ error: "Route not found" });
    });

    this.server = server;
    // this.knex = knex
  }

  start(port: number) {
    this.server.listen(port, () => {
      print(port);
    });
  }

  private stopHttpServer() {
    return new Promise<void>((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async stop() {
    await this.stopHttpServer();
    await this.knex.destroy();
  }
}
