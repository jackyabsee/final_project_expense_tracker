"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
const server_1 = require("./server");
let app = new server_1.AppServer();
app.start(env_1.env.PORT);
//# sourceMappingURL=main.js.map