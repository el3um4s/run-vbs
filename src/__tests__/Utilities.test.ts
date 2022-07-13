import { arch } from "../functions/arch";
import { cscript } from "../functions/cscript";
import {
  writeScriptToTempFile,
  deleteTempFile,
} from "../functions/createTempVbsFile";

describe("functions - utilites - arch", () => {
  test("should return x64", () => {
    const a = arch();
    expect(a === "x64" || a === "x86").toBeTruthy();
  });
});

describe("functions - utilites - cscript", () => {
  test("should return cscript.exe", () => {
    const a = cscript();
    expect(a).toContain("cscript.exe");
  });
});

describe("functions - utilites - createTempVbsFile", () => {
  test("should return temp file name", async () => {
    const script = "echo hello";
    const tempName = await writeScriptToTempFile(script);
    expect(tempName).toBeTruthy();
    await deleteTempFile(tempName);
  });
});
