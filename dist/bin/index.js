#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../src/config");
const methods_1 = require("../src/methods");
const opts_1 = __importDefault(require("../src/opts"));
function main() {
    const opts = (0, opts_1.default)();
    (0, config_1.validateArgs)(opts.args);
    const operation = (0, config_1.getOperation)(opts.args);
    switch (operation) {
        case config_1.Operation.printAll:
            (0, methods_1.logResults)((0, methods_1.selectGroup)("all", (0, methods_1.getAllCodes)()));
            break;
        case config_1.Operation.PrintOne:
            (0, methods_1.logOne)((0, methods_1.selectOne)(opts.args[0], (0, methods_1.getAllCodes)()));
            break;
        case config_1.Operation.PrintGroup:
            (0, methods_1.logResults)((0, methods_1.selectGroup)(opts.args[0], (0, methods_1.getAllCodes)()));
            break;
    }
}
main();
