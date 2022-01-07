"use strict";
exports.__esModule = true;
exports.Day3 = void 0;
var fs = require("fs");
var cloneDeep = require("lodash.clonedeep");
var Day3 = /** @class */ (function () {
    function Day3() {
    }
    Day3.ex1 = function () {
        var newBinaryNumbers = [];
        Day3.buff
            .toString()
            .split("\n")
            .forEach(function (bits, row) {
            newBinaryNumbers[row] = [];
            bits
                .split("")
                .map(Number)
                .forEach(function (bit, bitColumn) {
                newBinaryNumbers[row][bitColumn] = bit;
            });
            newBinaryNumbers[row].pop();
        });
        var gammaS = [];
        for (var i = 0; i < newBinaryNumbers[0].length; i++) {
            var count0 = 0;
            var count1 = 0;
            for (var j = 0; j < newBinaryNumbers.length; j++) {
                newBinaryNumbers[j][i] === 0 ? ++count0 : ++count1;
            }
            gammaS.push(count0 > count1 ? "0" : "1");
        }
        var gammaRate = parseInt(gammaS.join(""), 2);
        var epsilonRate = parseInt(gammaS.map(function (v) { return (v === "0" ? "1" : "0"); }).join(""), 2);
        return gammaRate * epsilonRate;
    };
    Day3.ex2 = function () {
        var newBinaryNumbers = [];
        Day3.buff
            .toString()
            .split("\n")
            .forEach(function (bits, row) {
            newBinaryNumbers[row] = [];
            bits
                .split("")
                .map(Number)
                .forEach(function (bit, bitColumn) {
                newBinaryNumbers[row][bitColumn] = bit;
            });
            newBinaryNumbers[row].pop();
        });
        var oxygenRating = parseInt(calculateRating(cloneDeep(newBinaryNumbers), "oxygen"), 2);
        var co2Rating = parseInt(calculateRating(cloneDeep(newBinaryNumbers), "co2"), 2);
        return oxygenRating * co2Rating;
        function calculateRating(binaryNumbers, type, colIndex) {
            if (colIndex === void 0) { colIndex = 0; }
            var count0 = 0;
            var count1 = 0;
            if (binaryNumbers.length === 1) {
                return binaryNumbers[0].join("");
            }
            for (var i = 0; i < binaryNumbers.length; i++) {
                binaryNumbers[i][colIndex] === 0 ? ++count0 : ++count1;
            }
            var criteria = type === "oxygen" ? 1 : 0;
            var filtered = [];
            if (count0 === count1) {
                filtered = binaryNumbers.filter(function (v) { return v[colIndex] === criteria; });
            }
            else {
                var max_1 = count0 > count1 ? 0 : 1;
                var min_1 = count0 < count1 ? 0 : 1;
                filtered = binaryNumbers.filter(function (v) { return v[colIndex] === (type === "oxygen" ? max_1 : min_1); });
            }
            return calculateRating(filtered, type, colIndex + 1);
        }
    };
    Day3.buff = fs.readFileSync("./inputs/ex3.txt");
    return Day3;
}());
exports.Day3 = Day3;
