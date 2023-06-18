"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isUser = void 0;
function isUser(//check the session is User or not
req, res, next) {
    if (!!req.session.user) {
        console.log("Oh this is user!");
        return next();
    }
    return res.status(401).redirect("/");
}
exports.isUser = isUser;
function isAdmin(//check the session is Admin or not
req, res, next) {
    var _a, _b;
    console.log(req.session.user, "&&", (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.role);
    if (
    //req.session.user && 
    ((_b = req.session.user) === null || _b === void 0 ? void 0 : _b.role) === `admin`) {
        console.log("Oh this is admin!");
        next();
    }
    else {
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
exports.isAdmin = isAdmin;
//# sourceMappingURL=guard.js.map