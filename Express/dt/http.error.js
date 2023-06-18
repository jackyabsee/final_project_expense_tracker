"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
    static endResponse(error, res) {
        res.status(error.statusCode || 500);
        res.json({ error: String(error) });
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=http.error.js.map