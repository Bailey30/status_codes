"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectOne = exports.selectGroup = exports.getAllGroups = exports.logOne = exports.logResults = exports.getAllCodes = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getFileContents() {
    return fs_1.default.readFileSync(path_1.default.join(__dirname, "status_codes.json"), "utf8");
}
function getAllCodes() {
    const file_contents = fs_1.default.readFileSync(path_1.default.join(__dirname, "status_codes.json"), "utf8");
    return JSON.parse(file_contents.toString());
}
exports.getAllCodes = getAllCodes;
function logResults(groups) {
    groups.forEach((group) => {
        const codeNumbers = Object.keys(group.codes);
        console.log(`${cyan}${group.name}`);
        codeNumbers.forEach((codeNumber) => {
            logOne({
                number: codeNumber,
                description: group.codes[codeNumber].description,
                details: group.codes[codeNumber].details,
            });
        });
    });
}
exports.logResults = logResults;
const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const blue = "\x1b[34m";
const magenta = "\x1b[35m";
const cyan = "\x1b[36m";
const white = "\x1b[37m";
function logOne(code) {
    console.log("\t", `${green}${code.number}${reset} ${yellow}${code.description}${reset} - ${red}${code.details}${reset}`);
}
exports.logOne = logOne;
function getAllGroups(allCodes) {
    const groups = [];
    Object.entries(allCodes).forEach(([key, value]) => {
        groups.push({
            name: key,
            codes: value,
        });
    });
    return groups;
}
exports.getAllGroups = getAllGroups;
function selectGroup(id = "all", allCodes) {
    const groups = [];
    Object.entries(allCodes).forEach(([key, value]) => {
        // key[0] is the first character
        // id[0] is the first character of the args
        if (key[0] === id[0] || id === "all")
            groups.push({
                name: key,
                codes: value,
            });
    });
    if (groups.length === 0) {
        throw new Error(`No codes found for ${id}. Enter in format '1xx' for specific codes or the numbers 1-5 to receive the corresponding group.`);
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
        throw new Error(`No codes found for ${id}. Enter in format '1xx' for specific codes or the numbers 1-5 to receive the corresponding group.`);
    }
}
exports.selectOne = selectOne;
