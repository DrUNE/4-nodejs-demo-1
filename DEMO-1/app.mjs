import { readFileSync } from "node:fs";

const data = readFileSync("./data.txt");
console.log(data.toString());
console.dir(await import("./some.mjs"));
console.dir(global);
console.dir(globalThis);
