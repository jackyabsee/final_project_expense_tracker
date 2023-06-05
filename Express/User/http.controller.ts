import { NextFunction, Request, Response, Router } from 'express'

export class HttpController {
  router = Router()

  // prefer this version, easier to use with router
  wrapMethod(fn: (req: Request) => object | Promise<object>) {
    return async function (req: Request, res: Response, next: NextFunction) {
      try {
        let json = await fn(req)
        res.json(json)
      } catch (error) {
        next(error)
      }
    }
  }
}

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
