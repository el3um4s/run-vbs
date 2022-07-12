import process from "process";
import { execSync } from "child_process";
import { statSync } from "fs";
import path from "path";

// https://github.com/feross/arch/blob/master/index.js
export const arch = (): string => {
  if (process.arch === "x64") {
    return "x64";
  }

  if (process.platform === "darwin") {
    return "x64";
  }

  if (process.platform === "linux") {
    var output = execSync("getconf LONG_BIT", { encoding: "utf8" });
    return output === "64\n" ? "x64" : "x86";
  }

  if (process.platform === "win32") {
    var useEnv = false;
    try {
      useEnv = !!(process.env.SYSTEMROOT && statSync(process.env.SYSTEMROOT));
    } catch (err) {}

    var sysRoot =
      useEnv && process.env.SYSTEMROOT ? process.env.SYSTEMROOT : "C:\\Windows";

    // If %SystemRoot%\SysNative exists, we are in a WOW64 FS Redirected application.
    var isWOW64 = false;
    try {
      isWOW64 = !!statSync(path.join(sysRoot, "sysnative"));
    } catch (err) {}

    return isWOW64 ? "x64" : "x86";
  }

  return "x86";
};
