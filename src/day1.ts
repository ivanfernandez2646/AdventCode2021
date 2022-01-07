import * as fs from "fs";

export abstract class Day1 {
  private static readonly buff: Buffer = fs.readFileSync("./inputs/ex1.txt");

  public static ex1(): number {
    const measures: number[] = Day1.buff.toString().split("\n").map(Number);
    let res: number = 0;
    measures.forEach((val, i) => {
      if (val > measures[i - 1]) {
        res++;
      }
    });
    return res;
  }

  public static ex2(): number {
    const measures: number[] = Day1.buff.toString().split("\n").map(Number);
    let res: number = 0;
    measures.forEach((val, i) => {
      const currSum = val + measures[i + 1] + measures[i + 2];
      const nextSum = measures[i + 1] + measures[i + 2] + measures[i + 3];
      if (currSum < nextSum) {
        res++;
      }
    });
    return res;
  }
}
