"use strict";
exports.__esModule = true;
exports.Day2 = void 0;
var fs = require("fs");
var Day2 = /** @class */ (function () {
    function Day2() {
    }
    Day2.ex1 = function () {
        var coords = Day2.buff
            .toString()
            .split("\n")
            .map(function (v) {
            return new Coord(v.split(" ")[0], Number(v.split(" ")[1]));
        });
        var horizontalPosition = 0;
        var depth = 0;
        coords.forEach(function (c) {
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
    };
    Day2.ex2 = function () {
        var coords = Day2.buff
            .toString()
            .split("\n")
            .map(function (v) {
            return new Coord(v.split(" ")[0], Number(v.split(" ")[1]));
        });
        var horizontalPosition = 0;
        var depth = 0;
        var aim = 0;
        coords.forEach(function (c) {
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
    };
    Day2.buff = fs.readFileSync("./inputs/ex2.txt");
    return Day2;
}());
exports.Day2 = Day2;
var Coord = /** @class */ (function () {
    function Coord(type, value) {
        this.type = type;
        this.value = value;
    }
    return Coord;
}());
