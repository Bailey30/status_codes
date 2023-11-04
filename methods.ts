import fs from "fs";
import path from "path";

export type StatusCodes = {
    [groupName: string]: {
        [statusCode: string]: { description: string; details: string };
    };
};

export function getAllCodes(): StatusCodes {
    const file_contents = fs.readFileSync(
        path.join(__dirname, "status_codes.json"),
        "utf8"
    );

    return JSON.parse(file_contents.toString());
}

type CodeInfo = {
    description: string;
    details: string;
};

export type Group = {
    name: string;
    codes: {
        [key: string]: CodeInfo;
    };
};

export type Status_Code = {
    number: string;
    description: string;
    details: string;
};

export function logResults(groups: Group[]): void {
    groups.forEach((group: Group) => {
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

const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const cyan = "\x1b[36m";

export function logOne(code: Status_Code): void {
    console.log(
        "\t",
        `${green}${code.number}${reset} ${yellow}${code.description}${reset} - ${red}${code.details}${reset}`
    );
}

export function getAllGroups(allCodes: StatusCodes): Group[] {
    const groups: any = [];
    Object.entries(allCodes).forEach(([key, value]) => {
        groups.push({
            name: key,
            codes: value,
        });
    });
    return groups;
}

export function selectGroup(
    id: string = "all",
    allCodes: StatusCodes
): Group[] {
    const groups: any = [];
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
        throw new Error(
            `No codes found for ${id}. Enter in format '1xx' for specific codes or the numbers 1-5 to receive the corresponding group.`
        );
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
        throw new Error(
            `No codes found for ${id}. Enter in format '1xx' for specific codes or the numbers 1-5 to receive the corresponding group.`
        );
    }
}
