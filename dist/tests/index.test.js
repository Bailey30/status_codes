"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../src/config");
const methods_1 = require("../src/methods");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const testData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../status_codes.json"), "utf8"));
test("should get all codes", () => {
    const result = (0, methods_1.getAllCodes)();
    // const codes = JSON.parse(result.toString());
    expect(result).toEqual(testData);
});
// test("should get all groups", () => {
//     const result = getAllCodes();
//     // const codes = JSON.parse(result.toString());
//     const groups = selectGroup("all", result);
//     console.log(groups);
//     expect(groups).toEqual([testData]);
// });
test("should get specific grouop", () => {
    const result = (0, methods_1.getAllCodes)();
    const just100 = (0, methods_1.selectGroup)("1", result);
    const expected = [
        {
            name: "1xx Informational",
            codes: {
                "100": {
                    description: "Continue",
                    details: "The initial part of the request has been received and the client should continue with the request.",
                },
                "101": {
                    description: "Switching Protocols",
                    details: "The server is changing protocols and the client should switch to a new protocol.",
                },
                "102": {
                    description: "Processing",
                    details: "The server is processing the request, but the client should continue to wait.",
                },
                "103": {
                    description: "Early Hints",
                    details: "This status code indicates to the client that the server is likely to send a 2xx response.",
                },
            },
        },
    ];
    expect(just100).toEqual(expected);
});
test("should return correct Operation", () => {
    const operation = (0, config_1.getOperation)([]);
    expect(operation).toEqual(config_1.Operation.printAll);
    const operation2 = (0, config_1.getOperation)(["1"]);
    expect(operation2).toEqual(config_1.Operation.PrintGroup);
    const operation3 = (0, config_1.getOperation)(["100"]);
    expect(operation3).toEqual(config_1.Operation.PrintOne);
});
test("should return one", () => {
    const result = (0, methods_1.selectOne)("100", (0, methods_1.getAllCodes)());
    const expected = {
        number: "100",
        description: "Continue",
        details: "The initial part of the request has been received and the client should continue with the request.",
    };
    console.log(result);
    expect(result).toEqual(expected);
});
