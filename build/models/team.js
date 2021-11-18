"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.team = void 0;
var mongoose_1 = require("mongoose");
var members = new mongoose_1.Schema({
    username: { type: String, required: true },
    role: { type: [String], required: true },
});
var taskSchema = new mongoose_1.Schema({
    taskname: { type: String, required: true },
    setBy: { type: String, required: true },
    deadline: { type: String },
});
var messages = new mongoose_1.Schema({
    receiver: { type: String, required: true },
    sender: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Number, default: Date.now() }
});
var teamSchema = new mongoose_1.Schema({
    team_name: { type: String, required: true },
    organisation: { type: String, required: true },
    description: { type: String, default: "Description of the team..." },
    tasks: { type: [taskSchema] },
    members: { type: [members] },
    messages: { type: [messages] }
});
var team = (0, mongoose_1.model)("team", teamSchema);
exports.team = team;
