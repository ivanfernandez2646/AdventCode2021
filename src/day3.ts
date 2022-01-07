import * as fs from "fs";
import cloneDeep = require("lodash.clonedeep");

export abstract class Day3 {
  private static readonly buff: Buffer = fs.readFileSync("./inputs/ex3.txt");

  public static ex1(): number {
    let newBinaryNumbers: number[][] = [];
    Day3.buff
      .toString()
      .split("\n")
      .forEach((bits, row) => {
        newBinaryNumbers[row] = [];
        bits
          .split("")
          .map(Number)
          .forEach((bit, bitColumn) => {
            newBinaryNumbers[row][bitColumn] = bit;
          });
        newBinaryNumbers[row].pop();
      });

    let gammaS: string[] = [];
    for (let i = 0; i < newBinaryNumbers[0].length; i++) {
      let count0 = 0;
      let count1 = 0;
      for (let j = 0; j < newBinaryNumbers.length; j++) {
        newBinaryNumbers[j][i] === 0 ? ++count0 : ++count1;
      }
      gammaS.push(count0 > count1 ? "0" : "1");
    }

    const gammaRate = parseInt(gammaS.join(""), 2);
    const epsilonRate = parseInt(
      gammaS.map((v) => (v === "0" ? "1" : "0")).join(""),
      2
    );

    return gammaRate * epsilonRate;
  }

  public static ex2(): number {
    let newBinaryNumbers: number[][] = [];
    Day3.buff
      .toString()
      .split("\n")
      .forEach((bits, row) => {
        newBinaryNumbers[row] = [];
        bits
          .split("")
          .map(Number)
          .forEach((bit, bitColumn) => {
            newBinaryNumbers[row][bitColumn] = bit;
          });
        newBinaryNumbers[row].pop();
      });

    const oxygenRating = parseInt(
      calculateRating(cloneDeep(newBinaryNumbers), "oxygen"),
      2
    );
    const co2Rating = parseInt(
      calculateRating(cloneDeep(newBinaryNumbers), "co2"),
      2
    );

    return oxygenRating * co2Rating;

    function calculateRating(
      binaryNumbers: number[][],
      type: "oxygen" | "co2",
      colIndex: number = 0
    ): string {
      let count0 = 0;
      let count1 = 0;

      if (binaryNumbers.length === 1) {
        return binaryNumbers[0].join("");
      }
      for (let i = 0; i < binaryNumbers.length; i++) {
        binaryNumbers[i][colIndex] === 0 ? ++count0 : ++count1;
      }

      const criteria: number = type === "oxygen" ? 1 : 0;
      let filtered: number[][] = [];
      if (count0 === count1) {
        filtered = binaryNumbers.filter((v) => v[colIndex] === criteria);
      } else {
        const max: number = count0 > count1 ? 0 : 1;
        const min: number = count0 < count1 ? 0 : 1;
        filtered = binaryNumbers.filter(
          (v) => v[colIndex] === (type === "oxygen" ? max : min)
        );
      }

      return calculateRating(filtered, type, colIndex + 1);
    }
  }
}
