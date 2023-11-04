import fs from "fs";
import path from "path";
import { StatusCodes, Group, Status_Code, CodesWithInfo } from "./types";
import { StatusError } from "./config";

export function getAllCodes(): StatusCodes {
    const file_contents = fs.readFileSync(
        path.join(__dirname, "../status_codes.json"),
        "utf8"
    );

    return JSON.parse(file_contents.toString());
}

export function selectGroup(
    id: string = "all",
    allCodes: StatusCodes
): Group[] {
    const groups: any = [];

    Object.entries(allCodes).forEach(
        ([key, value]: [string, CodesWithInfo]) => {
            // key[0] is the first character
            // id[0] is the first character of the args
            if (key[0] === id[0] || id === "all") {
                groups.push({
                    name: key,
                    codes: value,
                });
            }
        }
    );

    if (groups.length === 0) {
        throw new StatusError(id);
    }

    return groups;
}

export function selectOne(id: string, allCodes: StatusCodes): Status_Code {
    const group = selectGroup(id, allCodes);
    try {
        return {
            number: id,
            description: group[0].codes[id].description,
            details: group[0].codes[id].details,
        };
    } catch (error) {
        throw new StatusError(id);
    }
}

const reset = "\x1b[0m";
const underlined = "\x1b[4m";
const italic = "\x1b[3m";
const grey = "\x1b[90m";
const lightBlue = "\x1b[94m";

export function logResults(groups: Group[]): void {
    groups.forEach((group: Group) => {
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

export function logOne(code: Status_Code): void {
    console.log(
        "  ",
        `${lightBlue}${code.number}${reset} ${italic}${code.description}${reset} - ${grey}${code.details}${reset}`
    );
}
