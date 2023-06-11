import os from "os";
import fs from "fs";

console.log("address: ", os.networkInterfaces().WLAN[1].address);
const address = os.networkInterfaces().WLAN[1].address;
const port = ":8100";

export const apiOrigin = "http://" + address + port;
console.log("apiOrigin: ", apiOrigin);

fs.writeFileSync("./env.ts", `export const apiOrigin = "${apiOrigin}";`, {
  encoding: "utf8",
  flag: "w",
});
