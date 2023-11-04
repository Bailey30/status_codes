"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOne = exports.logResults = exports.selectOne = exports.selectGroup = exports.getAllCodes = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
function getAllCodes() {
    const file_contents = fs_1.default.readFileSync(path_1.default.join(__dirname, "../status_codes.json"), "utf8");
    return JSON.parse(file_contents.toString());
}
exports.getAllCodes = getAllCodes;
function selectGroup(id = "all", allCodes) {
    const groups = [];
    Object.entries(allCodes).forEach(([key, value]) => {
        // key[0] is the first character
        // id[0] is the first character of the args
        if (key[0] === id[0] || id === "all") {
            groups.push({
                name: key,
                codes: value,
            });
        }
    });
    if (groups.length === 0) {
        throw new config_1.StatusError(id);
    }
    return groups;
}
exports.selectGroup = selectGroup;
function selectOne(id, allCodes) {
    const group = selectGroup(id, allCodes);
    try {
        return {
            number: id,
            description: group[0].codes[id].description,
            details: group[0].codes[id].details,
        };
    }
    catch (error) {
        throw new config_1.StatusError(id);
    }
}
exports.selectOne = selectOne;
const reset = "\x1b[0m";
const underlined = "\x1b[4m";
const italic = "\x1b[3m";
const grey = "\x1b[90m";
const lightBlue = "\x1b[94m";
function logResults(groups) {
    groups.forEach((group) => {
        const codeNumbers = Object.keys(group.codes);
        console.log(`${underlined}${group.name}${reset}\n`);
        codeNumbers.forEach((codeNumber) => {
            logOne({
                number: codeNumber,
                description: group.codes[codeNumber].description,
                details: group.codes[codeNumber].details,
            });
        });
        console.log("");
    });
}
exports.logResults = logResults;
function logOne(code) {
    console.log("  ", `${lightBlue}${code.number}${reset} ${italic}${code.description}${reset} - ${grey}${code.details}${reset}`);
}
exports.logOne = logOne;
