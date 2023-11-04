import { Operation, getConfig } from "../config";
import { getAllCodes, getAllGroups, selectGroup, selectOne } from "../methods";
import fs from "fs";
import path from "path";

const testData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../status_codes.json"), "utf8")
);

test("should get all codes", () => {
    const result = getAllCodes();
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
    const result = getAllCodes();
    const just100 = selectGroup("1", result);

    const expected = [
        {
            name: "1xx Informational",
            codes: {
                "100": {
                    description: "Continue",
                    details:
                        "The initial part of the request has been received and the client should continue with the request.",
                },
                "101": {
                    description: "Switching Protocols",
                    details:
                        "The server is changing protocols and the client should switch to a new protocol.",
                },
                "102": {
                    description: "Processing",
                    details:
                        "The server is processing the request, but the client should continue to wait.",
                },
                "103": {
                    description: "Early Hints",
                    details:
                        "This status code indicates to the client that the server is likely to send a 2xx response.",
                },
            },
        },
    ];

    expect(just100).toEqual(expected);
});

test("should return correct Operation", () => {
    const operation = getConfig([]);
    expect(operation).toEqual(Operation.printAll);

    const operation2 = getConfig(["1"]);
    expect(operation2).toEqual(Operation.PrintGroup);

    const operation3 = getConfig(["100"]);
    expect(operation3).toEqual(Operation.PrintOne);
});

test("should return one", () => {
    const result = selectOne("100", getAllCodes());
    const expected = {
        number: "100",
        description: "Continue",
        details:
            "The initial part of the request has been received and the client should continue with the request.",
    };

    console.log(result);

    expect(result).toEqual(expected);
});
