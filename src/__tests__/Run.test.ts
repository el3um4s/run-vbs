import { runVbs, runVbsFile, runVbsBuffer, runVbsFileBuffer } from "../index";

const vbs = `
set args = Wscript.Arguments

Dim name, surname

Dim count
count = WScript.arguments.count

if count = 0 then
    name = ""
    surname = ""
    Wscript.Echo "hello world"
end if

if count = 1 then
    name = args(0)
    surname = ""
    Wscript.Echo "hello" & " " & name & "!"
end if

if count = 2 then
    name = args(0)
    surname = args(1)
    Wscript.Echo "hello" & " " & name & " " & surname  & "!"
end if
`;

describe("run runVbsFile", () => {
  test("should return result - runVbsScriptFromFile", async () => {
    const result = await runVbsFile({
      vbs: "./src/__tests__/test.vbs",
    });
    expect(result).toBeTruthy();
    expect(result).toBe("hello world");
  });

  test("should return result - runVbs", async () => {
    const result = await runVbs({
      vbs,
    });
    expect(result).toBeTruthy();
    expect(result).toBe("hello world");
  });

  test("should return result - runVbsFile - NO OUTPUT", async () => {
    const result = await runVbsFile({
      vbs: "./src/__tests__/test_no_output.vbs",
    });
    expect(result).toBe("");
  });

  test("should return result - runVbsFile - with Args: name", async () => {
    const result = await runVbsFile({
      vbs: "./src/__tests__/test.vbs",
      args: ["John"],
    });
    expect(result).toBeTruthy();
    expect(result).toBe("hello John!");
  });

  test("should return result - runVbsFile - with Args: name, surname", async () => {
    const result = await runVbsFile({
      vbs: "./src/__tests__/test.vbs",
      args: ["John", "Doe"],
    });
    expect(result).toBeTruthy();
    expect(result).toBe("hello John Doe!");
  });

  test("should return result - runVbs - with Args: name", async () => {
    const result = await runVbs({
      vbs,
      args: ["John"],
    });
    expect(result).toBeTruthy();
    expect(result).toBe("hello John!");
  });

  test("should return result - runVbs - with Args: name, surname", async () => {
    const result = await runVbs({
      vbs,
      args: ["John", "Doe"],
    });
    expect(result).toBeTruthy();
    expect(result).toBe("hello John Doe!");
  });

  test("should return result - runVbsFile - test-lines - with Args: 5", async () => {
    const result = await runVbsFile({
      vbs: "./src/__tests__/test-lines.vbs",
      args: ["a", "b", "c", "d", "e"],
    });
    expect(result).toBeTruthy();

    const expected = `You gave 5 arguments.
                      Argument 1 is: a
                      Argument 2 is: b
                      Argument 3 is: c
                      Argument 4 is: d
                      Argument 5 is: e`;
    expect(result.replace(/(\r\n|\n|\r| |\t)/gm, "").trim()).toBe(
      expected.replace(/(\r\n|\n|\r| |\t)/gm, "").trim()
    );
  });
});

describe("run vbs buffer", () => {
  test("should return result - runVbsScriptFromFile", async () => {
    const result = await runVbsFileBuffer({
      vbs: "./src/__tests__/test.vbs",
    });
    expect(result).toBeTruthy();
    const parsed = result[0].toString().trim();
    expect(parsed).toBe("hello world");
  });

  test("should return result - runVbsBuffer", async () => {
    const result = await runVbsBuffer({
      vbs,
    });
    expect(result).toBeTruthy();
    const parsed = result[0].toString().trim();
    expect(parsed).toBe("hello world");
  });

  test("should return result - runVbsFileBuffer - NO OUTPUT", async () => {
    const result = await runVbsFileBuffer({
      vbs: "./src/__tests__/test_no_output.vbs",
    });

    expect(result.toString()).toBe([].toString());
  });

  test("should return result - runVbsFileBuffer - with Args: name", async () => {
    const result = await runVbsFileBuffer({
      vbs: "./src/__tests__/test.vbs",
      args: ["John"],
    });
    expect(result).toBeTruthy();
    const parsed = result[0].toString().trim();
    expect(parsed).toBe("hello John!");
  });

  test("should return result - runVbsFileBuffer - with Args: name, surname", async () => {
    const result = await runVbsFileBuffer({
      vbs: "./src/__tests__/test.vbs",
      args: ["John", "Doe"],
    });
    expect(result).toBeTruthy();
    const parsed = result[0].toString().trim();
    expect(parsed).toBe("hello John Doe!");
  });

  test("should return result - runVbsBuffer - with Args: name", async () => {
    const result = await runVbsBuffer({
      vbs,
      args: ["John"],
    });
    expect(result).toBeTruthy();
    const parsed = result[0].toString().trim();
    expect(parsed).toBe("hello John!");
  });

  test("should return result - runVbsBuffer - with Args: name, surname", async () => {
    const result = await runVbsBuffer({
      vbs,
      args: ["John", "Doe"],
    });
    expect(result).toBeTruthy();
    const parsed = result[0].toString().trim();
    expect(parsed).toBe("hello John Doe!");
  });

  test("should return result - runVbsFileBuffer - test-lines - with Args: 5", async () => {
    const result = await runVbsFileBuffer({
      vbs: "./src/__tests__/test-lines.vbs",
      args: ["a", "b", "c", "d", "e"],
    });
    expect(result).toBeTruthy();

    const expected = `You gave 5 arguments.
                      Argument 1 is: a
                      Argument 2 is: b
                      Argument 3 is: c
                      Argument 4 is: d
                      Argument 5 is: e`;
    const parsed = result[0].toString().trim() + result[1].toString().trim();
    expect(parsed.replace(/(\r\n|\n|\r| |\t)/gm, "").trim()).toBe(
      expected.replace(/(\r\n|\n|\r| |\t)/gm, "").trim()
    );
  });

  test("should return result - runVbsBuffer - with Args: name, surname", async () => {
    const result = await runVbsBuffer({
      vbs,
      args: ["àèìòù", "°°°"],
    });
    expect(result).toBeTruthy();
  });
});
