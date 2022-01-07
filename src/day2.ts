import * as fs from "fs";

export abstract class Day2 {
  private static readonly buff: Buffer = fs.readFileSync("./inputs/ex2.txt");

  public static ex1(): number {
    const coords: Coord[] = Day2.buff
      .toString()
      .split("\n")
      .map((v) => {
        return new Coord(v.split(" ")[0] as any, Number(v.split(" ")[1]));
      });

    let horizontalPosition: number = 0;
    let depth: number = 0;
    coords.forEach((c) => {
      switch (c.type) {
        case "forward":
          horizontalPosition += c.value;
          break;
        case "down":
          depth += c.value;
          break;
        case "up":
          depth -= c.value;
          break;
      }
    });

    return horizontalPosition * depth;
  }

  public static ex2(): number {
    const coords: Coord[] = Day2.buff
      .toString()
      .split("\n")
      .map((v) => {
        return new Coord(v.split(" ")[0] as any, Number(v.split(" ")[1]));
      });

    let horizontalPosition: number = 0;
    let depth: number = 0;
    let aim: number = 0;
    coords.forEach((c) => {
      switch (c.type) {
        case "forward":
          horizontalPosition += c.value;
          depth += c.value * aim;
          break;
        case "down":
          aim += c.value;
          break;
        case "up":
          aim -= c.value;
          break;
      }
    });

    return horizontalPosition * depth;
  }
}

class Coord {
  type: "forward" | "up" | "down";
  value: number;

  constructor(type: "forward" | "up" | "down", value: number) {
    this.type = type;
    this.value = value;
  }
}
