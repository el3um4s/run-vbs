import { launchCommand } from "./launchCommand";
import { cscript } from "./cscript";
import { resolve } from "path";

const nologo = "//NOLOGO";
const engine = "//E:VBScript";

export const execute = async (vbsfile: string, args: string[] = []) => {
  const command = cscript();
  const file = resolve(vbsfile);
  const result = await launchCommand({
    command,
    args: [nologo, engine, file, ...args],
  });
  return result;
};
