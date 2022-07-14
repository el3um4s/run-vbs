import { spawn, SpawnOptionsWithoutStdio } from "node:child_process";
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

const spawnVBSbuffer = (cmd: Cmd): Promise<string[]> => {
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
      return resolve(result);
    });
  });
};

export { spawnVBS, spawnVBSbuffer };
