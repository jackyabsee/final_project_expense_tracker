import { env } from "./env";
import { AppServer } from "./server";

let app = new AppServer();
app.start(env.PORT);
