"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = require("bcryptjs");
// deepcode ignore HardcodedSecret: this is number of round, not fixed salt
const ROUND = 12;
function hashPassword(password) {
    return (0, bcryptjs_1.hash)(password, ROUND);
}
exports.hashPassword = hashPassword;
function comparePassword(options) {
    return (0, bcryptjs_1.compare)(options.password, options.password_hash);
}
exports.comparePassword = comparePassword;
;
;
//# sourceMappingURL=hash.js.map