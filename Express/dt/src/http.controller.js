"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpController = void 0;
const express_1 = require("express");
class HttpController {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    // prefer this version, easier to use with router
    wrapMethod(fn) {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let json = yield fn(req);
                    res.json(json);
                }
                catch (error) {
                    next(error);
                }
            });
        };
    }
}
exports.HttpController = HttpController;
// avoid this version, more verbose to use with router
//export function wrap2(
//  req: Request,
//  res: Response,
//  next: NextFunction,
//  fn: (req: Request) => object | Promise<object>,
//) {}
// level 0: statement, if, for-loop
// level 1: function, add(2,3)
// level 2: higher-order function | callback, button.addEventListener('click',()=>{})
// level 3: partially applied function | curry function, it take a function, it returns a function, which further take arguments
//# sourceMappingURL=http.controller.js.map