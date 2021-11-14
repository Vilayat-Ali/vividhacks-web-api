"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// Dependencies 
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var Env = __importStar(require("dotenv"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
// Environment Variables
Env.config({ path: __dirname + "/../.env" });
var app = (0, express_1.default)();
// Defining middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// adding databases
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
try {
    mongoose_1.default.connect(process.env.DATABASEURI, function (err) {
        if (err)
            throw err;
        else
            console.log("Connected to DB!");
    });
}
catch (err) {
    console.log(err.message);
}
// importing routes
var account_1 = require("./routes/account");
var team_1 = require("./routes/team");
var analytics_1 = require("./routes/analytics");
// Managing routes
app.get("/", function (req, res) {
    res.json({ "status": "OK", "project": {
            "name": "TEAM MANAGEMENT WEB APP API",
            "author": "Syed Vilayat Ali Rizvi",
            "competition": "Vivid Hacks 2021",
            "team_members": [{
                    "name": "Syed Vilayat Ali Rizvi",
                    "email": "vilayatcodemysite@gmail.com",
                    "role": ["Backend Engineer", "Database Administrator", "Team Leader"]
                }, {
                    "name": "Brayden Wright",
                    "email": "brayden45.dev@gmail.com",
                    "role": ["Front-End Engineer", "Team Leader"]
                }, {
                    "name": "Anant Kushyup",
                    "email": "ananthkashyap4@gmail.com",
                    "role": ["Frontend Engineer", "Research Lead"]
                }, {
                    "name": "Farhan Haider",
                    "email": "riz4mix@gmail.com",
                    "role": ["Graphic Designer", "Asset Manager"]
                }]
        } });
});
app.use("/account", account_1.accountRouter);
app.use("/team", team_1.teamRouter);
app.use("/analytics", analytics_1.analyticsRouter);
// app listening
app.listen(8000, process.env.HOST || "0.0.0.0", function () {
    console.log("Server running ...");
});
