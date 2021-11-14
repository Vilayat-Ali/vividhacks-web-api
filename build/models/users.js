"use strict";
// User Model
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
var mongoose_1 = require("mongoose");
var partOfSchema = new mongoose_1.Schema({
    team_name: { type: String, required: true },
    role: { type: [String] }
});
var userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    description: { type: String, default: "Hi! Busy at work!" },
    organisation: { type: String, default: "Another FaceBook INC" },
    password: { type: String, required: true },
    member_of: { type: [partOfSchema] }
});
var user = (0, mongoose_1.model)("User", userSchema);
exports.user = user;
