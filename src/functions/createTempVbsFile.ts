import { writeFile, unlink } from "fs/promises";
var tmp = require("tmp");

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
