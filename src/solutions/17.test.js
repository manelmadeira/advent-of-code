import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { operations, solutionPartOne, solutionPartTwo } from "./17";

describe("Day 17", () => {
  describe("operations", () => {
    it("If register C contains 9, the program 2,6 would set register B to 1", () => {
      const result = operations(0n, 0n, 9n, 2n, 6n);

      expect(result.b).toEqual(1n);
    });

    it("If register B contains 29, the program 1,7 would set register B to 26", () => {
      const result = operations(0n, 29n, 0n, 1n, 7n);

      expect(result.b).toEqual(26n);
    });

    it("If register B contains 2024 and register C contains 43690, the program 4,0 would set register B to 44354", () => {
      const result = operations(0n, 2024n, 43690n, 4n, 0n);

      expect(result.b).toEqual(44354n);
    });
  });

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const A = 10n;
      const B = 0n;
      const C = 0n;
      const program = "5,0,5,1,5,4".split(",").map(BigInt);
      expect(solutionPartOne(A, B, C, program)).toEqual("0,1,2");
    });

    it("should return the correct value for the example", () => {
      const A = 729n;
      const B = 0n;
      const C = 0n;
      const program = "0,1,5,4,3,0".split(",").map(BigInt);
      expect(solutionPartOne(A, B, C, program)).toEqual("4,6,3,5,6,3,5,2,1,0");
    });

    it("should return the correct value for the example", () => {
      const A = 117440n;
      const B = 0n;
      const C = 0n;
      const program = "0,3,5,4,3,0".split(",").map(BigInt);
      expect(solutionPartOne(A, B, C, program)).toEqual("0,3,5,4,3,0");
    });

    it("should return the correct value for the first part", () => {
      const A = 45483412n;
      const B = 0n;
      const C = 0n;
      const program = "2,4,1,3,7,5,0,3,4,1,1,5,5,5,3,0".split(",").map(BigInt);
      expect(solutionPartOne(A, B, C, program)).toEqual("1,5,0,5,2,0,1,3,5");
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the example", () => {
      expect(solutionPartTwo("0,3,5,4,3,0")).toEqual(117440n);
    });

    it("should return the correct value for the example", () => {
      expect(solutionPartTwo("2,4,1,3,7,5,0,3,4,1,1,5,5,5,3,0")).toEqual(
        236581108670061n
      );
    });
  });
});
