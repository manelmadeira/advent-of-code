import fs from "node:fs";

export function readInput(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");

    return data
      .split(/\r?\n/)
      .map((line) => {
        return line.trim();
      })
      .filter((line) => !!line);
  } catch (err) {
    console.error(err);
  }
}
