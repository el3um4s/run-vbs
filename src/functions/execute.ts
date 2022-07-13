import { launchCommand } from "./launchCommand";
import { cscript } from "./cscript";
import { resolve } from "path";

export const execute = async (vbsFile: string, args: string[] = []) => {
  const nologo = "//NOLOGO";
  const engine = "//E:VBScript";

  const command = cscript();
  const file = resolve(vbsFile);
  const result = await launchCommand({
    command,
    args: [nologo, engine, `"${file}"`, ...args],
  });
  return result;
};
