import { spawn, SpawnOptionsWithoutStdio } from "node:child_process";
import { Buffer } from "buffer";

const isEmpty = (object: Record<string, unknown>): boolean =>
  Object.keys(object).length === 0;

const exitMessages: Record<number, string> = {
  1: "Uncaught Fatal Exception",
  3: "Internal JavaScript Parse Error",
  4: "Internal JavaScript Evaluation Failure",
  5: "Fatal Error",
  6: "Non-function Internal Exception Handler",
  7: "Internal Exception Handler Run-Time Failure",
  9: "Invalid Argument",
  10: "Internal JavaScript Run-Time Failure",
  12: "Invalid Debug Argument",
};

interface Cmd {
  command: string;
  args: string[];
  options?: SpawnOptionsWithoutStdio;
}

const spawnVBS = (cmd: Cmd): Promise<string> => {
  const { command, args, options } = cmd;

  return new Promise((resolve) => {
    const child = spawn(command, args, {
      windowsHide: true,
      shell: true,

      ...options,
    });

    const result: string[] = [];
    child.stdout.on("data", (data) => {
      result.push(data);
    });

    child.on("close", () => {
      return resolve(result.join(""));
    });
  });
};

export { spawnVBS };
