import { execute, executeBuffer } from "././functions/execute";
import {
  writeScriptToTempFile,
  deleteTempFile,
} from "./functions/createTempVbsFile";

const runVbsFile = async (data: {
  vbs: string;
  args?: string[];
}): Promise<string> => {
  const { vbs, args } = data;

  const a = args ? args : [];

  const result = await execute(vbs, a);
  return result.trim();
};

const runVbs = async (data: {
  vbs: string;
  args?: string[];
}): Promise<string> => {
  const { vbs, args } = data;

  const vbsTempFile = await writeScriptToTempFile(vbs);
  const a = args ? args : [];
  const result = await execute(vbsTempFile, a);

  await deleteTempFile(vbsTempFile);

  return result.trim();
};

const runVbsFileBuffer = async (data: {
  vbs: string;
  args?: string[];
}): Promise<string[]> => {
  const { vbs, args } = data;

  const a = args ? args : [];

  const result = await executeBuffer(vbs, a);
  return result;
};

const runVbsBuffer = async (data: {
  vbs: string;
  args?: string[];
}): Promise<string[]> => {
  const { vbs, args } = data;

  const vbsTempFile = await writeScriptToTempFile(vbs);
  const a = args ? args : [];
  const result = await executeBuffer(vbsTempFile, a);

  await deleteTempFile(vbsTempFile);

  return result;
};

export { runVbs, runVbsFile, runVbsBuffer, runVbsFileBuffer };
