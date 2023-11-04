#!/usr/bin/env node

import { CommandLineOptions } from "command-line-args";
import { Operation, getConfig, handleArgs } from "../config";
import {
    getAllCodes,
    logOne,
    logResults,
    selectGroup,
    selectOne,
} from "../methods";
import getOpts from "../opts";

function main() {
    const opts: CommandLineOptions = getOpts();

    handleArgs(opts.args);

    const operation: Operation = getConfig(opts.args);

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
