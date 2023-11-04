export class StatusError extends RangeError {
    constructor(id: string) {
        super();
        this.message = `No codes found for ${id}. Enter in format '1xx' for specific codes or the numbers 1-5 to receive the corresponding group.`;
    }
}

export enum Operation {
    printAll,
    PrintGroup,
    PrintOne,
}

export function validateArgs(args?: string[]): void {
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

export function getOperation(args: string[]): Operation {
    if (!args || args[0] === undefined) {
        return Operation.printAll;
    } else if (args && args[0].length === 3) {
        return Operation.PrintOne;
    } else if (args && args[0].length === 1) {
        return Operation.PrintGroup;
    } else return Operation.printAll;
}
