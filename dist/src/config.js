"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOperation = exports.validateArgs = exports.StatusError = exports.Operation = void 0;
var Operation;
(function (Operation) {
    Operation[Operation["printAll"] = 0] = "printAll";
    Operation[Operation["PrintGroup"] = 1] = "PrintGroup";
    Operation[Operation["PrintOne"] = 2] = "PrintOne";
})(Operation || (exports.Operation = Operation = {}));
class StatusError extends RangeError {
    constructor(id) {
        super();
        this.message = `No codes found for ${id}. Enter in format '1xx' for specific codes or the numbers 1-5 to receive the corresponding group.`;
    }
}
exports.StatusError = StatusError;
function validateArgs(args) {
    if (!args) {
        return;
    }
    if (args.length > 1) {
        throw new Error("too many arguments");
    }
    if ((args.length === 1 && args[0].length > 3) || args[0].length === 2) {
        throw new StatusError(args[0]);
    }
}
exports.validateArgs = validateArgs;
function getOperation(args) {
    if (!args || args[0] === undefined) {
        return Operation.printAll;
    }
    else if (args && args[0].length === 3) {
        return Operation.PrintOne;
    }
    else if (args && args[0].length === 1) {
        return Operation.PrintGroup;
    }
    else
        return Operation.printAll;
}
exports.getOperation = getOperation;
