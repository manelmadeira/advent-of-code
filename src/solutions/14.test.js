import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartOne } from "./14";

const REGEX = /.*=(\d+,\d+) .*=([-\d]+,[-\d]+)/g;

describe("Day 13", () => {
  function prepareData(filePath) {
    const dataArray = readInput(filePath);

    const robots = [];
    for (let i = 0; i < dataArray.length; i += 1) {
      const robot = [...dataArray[i].matchAll(REGEX)][0];
      const position = robot[1].split(",").map(Number);
      const velocity = robot[2].split(",").map(Number);

      robots.push([position, velocity]);
    }

    return robots;
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/14-example.txt")
      );

      expect(solutionPartOne(data, 100, 11, 7)).toEqual(12);
    });

    it("should return the correct value for the first part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/14.txt"));

      expect(solutionPartOne(data, 100, 101, 103)).toEqual(223020000);
    });
  });

  describe("Part Two", () => {
    // it.only("should return the correct value for the first part", () => {
    //   const data = prepareData(path.join(__dirname, "../inputs/14.txt"));
    //   for (let i = 1; i < 10000; i += 1) {
    //     expect(solutionPartOne(data, i, 101, 103)).not.toBeNaN();
    //   }
    // });
  });
});
