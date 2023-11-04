import cli, { CommandLineOptions } from "command-line-args";

export default function getOpts(): CommandLineOptions {
    return cli([
        {
            name: "args",
            defaultOption: true,
            type: String,
            multiple: true,
        },
        {
            name: "verbose",
            alias: "v",
            type: Boolean,
        },
    ]);
}
