"use strict";
exports.__esModule = true;
exports.Day1 = void 0;
var fs = require("fs");
var Day1 = /** @class */ (function () {
    function Day1() {
    }
    Day1.ex1 = function () {
        var measures = Day1.buff.toString().split("\n").map(Number);
        var res = 0;
        measures.forEach(function (val, i) {
            if (val > measures[i - 1]) {
                res++;
            }
        });
        return res;
    };
    Day1.ex2 = function () {
        var measures = Day1.buff.toString().split("\n").map(Number);
        var res = 0;
        measures.forEach(function (val, i) {
            var currSum = val + measures[i + 1] + measures[i + 2];
            var nextSum = measures[i + 1] + measures[i + 2] + measures[i + 3];
            if (currSum < nextSum) {
                res++;
            }
        });
        return res;
    };
    Day1.buff = fs.readFileSync("./inputs/ex1.txt");
    return Day1;
}());
exports.Day1 = Day1;
