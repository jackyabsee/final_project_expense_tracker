import express from "express";

export function isUser( //check the session is User or not
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!!req.session.user) {
    console.log("Oh this is user!")
    return next();
  } 
  
  return res.status(401).redirect("/");
}

export function isAdmin( //check the session is Admin or not
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
    console.log(req.session.user, "&&", req.session.user?.role)
  if (
    //req.session.user && 
    req.session.user?.role === `admin`) {
    console.log("Oh this is admin!")
    next();
  } else {
    res.status(401);
    //res.json({});
    //console.log("user redirect in isadmin");
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
    });
    res.redirect("/");
  }
}



