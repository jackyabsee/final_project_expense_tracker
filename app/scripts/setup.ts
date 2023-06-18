import fs from "fs";
import { print } from "listening-on";
import { apiOrigin } from "../env";

console.log = () => {
  if (!apiOrigin) return;
  fs.writeFileSync("./env.ts", `export const apiOrigin = "${apiOrigin}";`);
  console.debug("Setting apiOrigin:", apiOrigin);
};
print(8080);
