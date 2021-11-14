"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.team = void 0;
var mongoose_1 = require("mongoose");
var memberSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    role: { type: [String] }
});
var teamSchema = new mongoose_1.Schema({
    teamName: { type: String, required: true, unique: true },
    organisation: { type: String, required: true },
    description: { type: String, default: "We are a team of hardworking individuals!" },
    tasks: { type: [String] },
    members: [memberSchema]
});
var team = (0, mongoose_1.model)("Teams", teamSchema);
exports.team = team;
