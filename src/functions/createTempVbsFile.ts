import { writeFile, unlink } from "node:fs/promises";

import tmp = require("tmp");

const writeScriptToTempFile = async (script: string): Promise<string> => {
  const tempName: string = tmp.tmpNameSync();
  await writeFile(tempName, script);
  return tempName;
};

// async function to delete temp file
const deleteTempFile = async (tempName: string): Promise<void> => {
  await unlink(tempName);
};

export { writeScriptToTempFile, deleteTempFile };
