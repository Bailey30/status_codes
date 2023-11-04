#!/usr/bin/env node

import { CommandLineOptions } from "command-line-args";
import { Operation, getOperation, validateArgs } from "../src/config";
import {
    getAllCodes,
    logOne,
    logResults,
    selectGroup,
    selectOne,
} from "../src/methods";
import getOpts from "../src/opts";

function main() {
    const opts: CommandLineOptions = getOpts();

    validateArgs(opts.args);

    const operation: Operation = getOperation(opts.args);

    switch (operation) {
        case Operation.printAll:
            logResults(selectGroup("all", getAllCodes()));
            break;
        case Operation.PrintOne:
            logOne(selectOne(opts.args[0], getAllCodes()));
            break;
        case Operation.PrintGroup:
            logResults(selectGroup(opts.args[0], getAllCodes()));
            break;
    }
}

main();
