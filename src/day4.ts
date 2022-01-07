import * as fs from "fs";

export abstract class Day4 {
  private static readonly buff: Buffer = fs.readFileSync("./inputs/ex4.txt");

  public static ex1(): number {
    const processedData = Day4.buff.toString().split(/\n\s*\n/);
    const bingoNumbers: number[] = processedData[0].split(",").map(Number);
    processedData.shift();
    const bingoCardsNumbers: number[][][] =
      Day4.getBingoCardsNumbers(processedData);

    let bingoCardWinner: number[][];
    let lastNumberBeforeWin: number;
    for (const bingoNumber of bingoNumbers) {
      Day4.setSelectedNumbers(bingoNumber, bingoCardsNumbers);
      bingoCardWinner = Day4.checkAnyoneWins(bingoCardsNumbers);
      if (bingoCardWinner) {
        lastNumberBeforeWin = bingoNumber;
        break;
      }
    }

    const resultNumber: number = Day4.getResultNumber(
      bingoCardWinner,
      lastNumberBeforeWin
    );

    return resultNumber;
  }

  public static ex2(): number {
    //TODO
    return 1;
  }

  private static getBingoCardsNumbers(processedData: string[]): number[][][] {
    const res: number[][][] = [];
    const chunk: number = 5;
    for (let i = 0; i < processedData.length; i++) {
      let newBingoCard: number[][] = [];
      let data = processedData[i].split(/\s/).filter((v) => v !== "");
      let currentCardNumberIndex: number = 0;
      for (let i = 0; i < chunk; i++) {
        newBingoCard[i] = [];
        let tmpContCardChunk = 0;
        while (tmpContCardChunk < chunk) {
          newBingoCard[i].push(Number(data[currentCardNumberIndex]));
          tmpContCardChunk++;
          currentCardNumberIndex++;
        }
      }
      res[i] = newBingoCard;
    }

    return res;
  }

  private static setSelectedNumbers(
    bingoNumber: number,
    bingoCardsNumbers: number[][][]
  ): void {
    for (
      let bingoCardIndex = 0;
      bingoCardIndex < bingoCardsNumbers.length;
      bingoCardIndex++
    ) {
      for (
        let bingoCardRowIndex = 0;
        bingoCardRowIndex < bingoCardsNumbers[bingoCardIndex].length;
        bingoCardRowIndex++
      ) {
        let bingoCardRow: number[] =
          bingoCardsNumbers[bingoCardIndex][bingoCardRowIndex];
        bingoCardRow = bingoCardRow.map((v) => {
          return v === bingoNumber ? undefined : v;
        });
        bingoCardsNumbers[bingoCardIndex][bingoCardRowIndex] = bingoCardRow;
      }
    }
  }

  private static checkAnyoneWins(bingoCardsNumbers: number[][][]): number[][] {
    for (
      let bingoCardIndex = 0;
      bingoCardIndex < bingoCardsNumbers.length;
      bingoCardIndex++
    ) {
      if (
        checkColumnOrRowsWinner(bingoCardsNumbers[bingoCardIndex], "column") ||
        checkColumnOrRowsWinner(bingoCardsNumbers[bingoCardIndex], "row")
      ) {
        return bingoCardsNumbers[bingoCardIndex];
      }
    }

    return undefined;

    function checkColumnOrRowsWinner(
      bingoCardNumbers: number[][],
      type: "column" | "row"
    ): boolean {
      let isWinner: boolean;
      if (type === "row") {
        for (
          let bingoCardRowIndex = 0;
          bingoCardRowIndex < bingoCardNumbers.length;
          bingoCardRowIndex++
        ) {
          const isRowWinner =
            bingoCardNumbers[bingoCardRowIndex].filter((v) => v !== undefined)
              .length === 0;

          if (isRowWinner) {
            isWinner = true;
            break;
          }
        }
      } else if (type === "column") {
        for (
          let bingoCardColumnIndex = 0;
          bingoCardColumnIndex < bingoCardNumbers[0].length;
          bingoCardColumnIndex++
        ) {
          let isColumnWinner: boolean = true;
          for (
            let bingoCardRowIndex = 0;
            bingoCardRowIndex < bingoCardNumbers.length;
            bingoCardRowIndex++
          )
            if (
              bingoCardNumbers[bingoCardRowIndex][bingoCardColumnIndex] !==
              undefined
            ) {
              isColumnWinner = false;
              break;
            }

          if (isColumnWinner) {
            isWinner = true;
            break;
          }
        }
      }
      return isWinner;
    }
  }

  private static getResultNumber(
    bingoCardWinner: number[][],
    lastNumberBeforeWin: number
  ): number {
    return (
      bingoCardWinner
        .flat(1)
        .filter((v) => v !== undefined)
        .reduce((prev, curr) => (prev += curr)) * lastNumberBeforeWin
    );
  }
}
