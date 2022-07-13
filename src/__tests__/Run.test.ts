import { runVbs, runVbsFile } from "../index";

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

describe("run vbs", () => {
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

  test("should return result - runVbsScriptFromFile - NO OUTPUT", async () => {
    const result = await runVbsFile({
      vbs: "./src/__tests__/test_no_output.vbs",
    });
    expect(result).toBe("");
  });

  test("should return result - runVbsScriptFromFile - with Args: name", async () => {
    const result = await runVbsFile({
      vbs: "./src/__tests__/test.vbs",
      args: ["John"],
    });
    expect(result).toBeTruthy();
    expect(result).toBe("hello John!");
  });

  test("should return result - runVbsScriptFromFile - with Args: name, surname", async () => {
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

  test("should return result - test-lines - with Args: 5", async () => {
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
