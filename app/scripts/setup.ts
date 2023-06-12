import fs from "fs";
import { print } from "listening-on";

console.log = (message: string) => {
  let apiOrigin = message.match(/(http:\/\/192\..*) /)?.[1];
  if (!apiOrigin) return;
  fs.writeFileSync("./env.ts", `export const apiOrigin = "${apiOrigin}";`);
  console.debug('Setting apiOrigin:', apiOrigin)
};
print(8100);
