"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discussion = void 0;
var mongoose_1 = require("mongoose");
var messages = new mongoose_1.Schema({
    username: { type: String, required: true },
    messageText: { type: String, required: true }
}, { timestamps: true });
var discussionSchema = new mongoose_1.Schema({
    teamName: { type: String, required: true },
    organisation: { type: String, required: true },
    messages: { type: [messages], required: true }
});
var discussion = (0, mongoose_1.model)("Discussion", discussionSchema);
exports.discussion = discussion;
