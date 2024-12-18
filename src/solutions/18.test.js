import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartOne, solutionPartTwo } from "./18";

describe("Day 18", () => {
  function prepareData(filePath, maxBytes, width, height) {
    const dataArray = readInput(filePath);

    const map = [];
    for (let row = 0; row < height + 1; row += 1) {
      const newRow = [];

      for (let col = 0; col < width + 1; col += 1) {
        newRow.push(".");
      }

      map.push(newRow);
    }

    for (let i = 0; i < maxBytes; i += 1) {
      const [col, row] = dataArray[i].split(",");
      map[row][col] = "#";
    }

    return map;
  }

  function prepareDataV2(filePath) {
    const dataArray = readInput(filePath);

    return dataArray;
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const map = prepareData(
        path.join(__dirname, "../inputs/18-example.txt"),
        12,
        6,
        6
      );

      expect(solutionPartOne(map)).toEqual(22);
    });

    it("should return the correct value for the first part", () => {
      const map = prepareData(
        path.join(__dirname, "../inputs/18.txt"),
        1024,
        70,
        70
      );

      expect(solutionPartOne(map)).toEqual(264);
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the example", () => {
      const coords = prepareDataV2(
        path.join(__dirname, "../inputs/18-example.txt")
      );
      expect(solutionPartTwo(coords, 6, 6)).toEqual("6,1");
    });

    it("should return the correct value for the second part", () => {
      const coords = prepareDataV2(path.join(__dirname, "../inputs/18.txt"));
      expect(solutionPartTwo(coords, 70, 70)).toEqual("41,26");
    });
  });
});
