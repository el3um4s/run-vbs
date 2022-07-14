import { spawnVBS, spawnVBSbuffer } from "./spawnVBS";
import { cscript } from "./cscript";
import { resolve } from "path";

export const execute = async (
  vbsFile: string,
  args: string[]
): Promise<string> => {
  const nologo = "//NOLOGO";
  const engine = "//E:VBScript";

  const command = cscript();
  const file = resolve(vbsFile);
  const result = await spawnVBS({
    command,
    args: [nologo, engine, file, ...args],
  });
  return result;
};

export const executeBuffer = async (
  vbsFile: string,
  args: string[]
): Promise<string[]> => {
  const nologo = "//NOLOGO";
  const engine = "//E:VBScript";

  const command = cscript();
  const file = resolve(vbsFile);
  const result = await spawnVBSbuffer({
    command,
    args: [nologo, engine, file, ...args],
  });
  return result;
};
