import path = require("node:path");
import { arch } from "./arch";

const archx64 = arch() === "x64";
const sysroot = process.env["systemroot"] || process.env["windir"];
const cscript64 = path.join(
  sysroot ? sysroot : "",
  archx64 ? "SysWOW64" : "System32",
  "cscript.exe"
);
const cscript32 = path.join(sysroot ? sysroot : "", "System32/cscript.exe");

export const cscript = (): string => (archx64 ? cscript64 : cscript32);
