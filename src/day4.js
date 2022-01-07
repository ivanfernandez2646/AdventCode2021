"use strict";
exports.__esModule = true;
exports.Day4 = void 0;
var fs = require("fs");
var Day4 = /** @class */ (function () {
    function Day4() {
    }
    Day4.ex1 = function () {
        var processedData = Day4.buff.toString().split(/\n\s*\n/);
        var bingoNumbers = processedData[0].split(",").map(Number);
        processedData.shift();
        var bingoCardsNumbers = Day4.getBingoCardsNumbers(processedData);
        var bingoCardWinner;
        var lastNumberBeforeWin;
        for (var _i = 0, bingoNumbers_1 = bingoNumbers; _i < bingoNumbers_1.length; _i++) {
            var bingoNumber = bingoNumbers_1[_i];
            Day4.setSelectedNumbers(bingoNumber, bingoCardsNumbers);
            bingoCardWinner = Day4.checkAnyoneWins(bingoCardsNumbers);
            if (bingoCardWinner) {
                lastNumberBeforeWin = bingoNumber;
                break;
            }
        }
        var resultNumber = Day4.getResultNumber(bingoCardWinner, lastNumberBeforeWin);
        return resultNumber;
    };
    Day4.ex2 = function () {
        //TODO
        return 1;
    };
    Day4.getBingoCardsNumbers = function (processedData) {
        var res = [];
        var chunk = 5;
        for (var i = 0; i < processedData.length; i++) {
            var newBingoCard = [];
            var data = processedData[i].split(/\s/).filter(function (v) { return v !== ""; });
            var currentCardNumberIndex = 0;
            for (var i_1 = 0; i_1 < chunk; i_1++) {
                newBingoCard[i_1] = [];
                var tmpContCardChunk = 0;
                while (tmpContCardChunk < chunk) {
                    newBingoCard[i_1].push(Number(data[currentCardNumberIndex]));
                    tmpContCardChunk++;
                    currentCardNumberIndex++;
                }
            }
            res[i] = newBingoCard;
        }
        return res;
    };
    Day4.setSelectedNumbers = function (bingoNumber, bingoCardsNumbers) {
        for (var bingoCardIndex = 0; bingoCardIndex < bingoCardsNumbers.length; bingoCardIndex++) {
            for (var bingoCardRowIndex = 0; bingoCardRowIndex < bingoCardsNumbers[bingoCardIndex].length; bingoCardRowIndex++) {
                var bingoCardRow = bingoCardsNumbers[bingoCardIndex][bingoCardRowIndex];
                bingoCardRow = bingoCardRow.map(function (v) {
                    return v === bingoNumber ? undefined : v;
                });
                bingoCardsNumbers[bingoCardIndex][bingoCardRowIndex] = bingoCardRow;
            }
        }
    };
    Day4.checkAnyoneWins = function (bingoCardsNumbers) {
        for (var bingoCardIndex = 0; bingoCardIndex < bingoCardsNumbers.length; bingoCardIndex++) {
            if (checkColumnOrRowsWinner(bingoCardsNumbers[bingoCardIndex], "column") ||
                checkColumnOrRowsWinner(bingoCardsNumbers[bingoCardIndex], "row")) {
                return bingoCardsNumbers[bingoCardIndex];
            }
        }
        return undefined;
        function checkColumnOrRowsWinner(bingoCardNumbers, type) {
            var isWinner;
            if (type === "row") {
                for (var bingoCardRowIndex = 0; bingoCardRowIndex < bingoCardNumbers.length; bingoCardRowIndex++) {
                    var isRowWinner = bingoCardNumbers[bingoCardRowIndex].filter(function (v) { return v !== undefined; })
                        .length === 0;
                    if (isRowWinner) {
                        isWinner = true;
                        break;
                    }
                }
            }
            else if (type === "column") {
                for (var bingoCardColumnIndex = 0; bingoCardColumnIndex < bingoCardNumbers[0].length; bingoCardColumnIndex++) {
                    var isColumnWinner = true;
                    for (var bingoCardRowIndex = 0; bingoCardRowIndex < bingoCardNumbers.length; bingoCardRowIndex++)
                        if (bingoCardNumbers[bingoCardRowIndex][bingoCardColumnIndex] !==
                            undefined) {
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
    };
    Day4.getResultNumber = function (bingoCardWinner, lastNumberBeforeWin) {
        return (bingoCardWinner
            .flat(1)
            .filter(function (v) { return v !== undefined; })
            .reduce(function (prev, curr) { return (prev += curr); }) * lastNumberBeforeWin);
    };
    Day4.buff = fs.readFileSync("./inputs/ex4.txt");
    return Day4;
}());
exports.Day4 = Day4;
