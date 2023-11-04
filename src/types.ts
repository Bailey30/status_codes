export type StatusCodes = {
    [groupName: string]: {
        [statusCode: string]: { description: string; details: string };
    };
};

type CodeInfo = {
    description: string;
    details: string;
};

export type CodesWithInfo = {
    [key: string]: CodeInfo;
};

//{ CodesWithInfo }
//{
// "100": {
//     "description": "Continue",
//     "details": "The initial part of the request has been received and the client should continue with the request."
//  }.
// "101": {
//     "description": "Switching Protocols",
//     "details": "The server is changing protocols and the client should switch to a new protocol."
//  }
//}

export type Group = {
    name: string;
    codes: CodesWithInfo;
};

// { Group }
// "1xx Informational": {
//     "100": {
//         "description": "Continue",
//         "details": "The initial part of the request has been received and the client should continue with the request."
//     },
//      etc...

export type Status_Code = {
    number: string;
    description: string;
    details: string;
};
