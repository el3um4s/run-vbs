import { statSync } from "fs";
import path = require("node:path");

// https://github.com/feross/arch/blob/master/index.js
export const arch = (): string => {
  if (process.arch === "x64") {
    return "x64";
  }

  if (process.platform === "win32") {
    let useEnv = false;
    try {
      useEnv = !!(process.env.SYSTEMROOT && statSync(process.env.SYSTEMROOT));
    } catch (err) {
      return "x86";
    }

    const sysRoot =
      useEnv && process.env.SYSTEMROOT ? process.env.SYSTEMROOT : "C:\\Windows";

    // If %SystemRoot%\SysNative exists, we are in a WOW64 FS Redirected application.
    let isWOW64 = false;
    try {
      isWOW64 = !!statSync(path.join(sysRoot, "sysnative"));
    } catch (err) {
      return "x86";
    }

    return isWOW64 ? "x64" : "x86";
  }

  return "x86";
};
