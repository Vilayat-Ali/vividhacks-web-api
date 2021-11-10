import {Schema, model} from "mongoose";

interface messagesI{
    username: string,
    messageText: string,
}

interface discussionI{
    teamName: string,
    organisation: string
    messages: messagesI[]
}

const messages = new Schema<messagesI>({
    username: {type: String, required: true},
    messageText: {type: String, required: true}
},{timestamps: true});

const discussionSchema = new Schema<discussionI>({
    teamName: {type: String, required: true},
    organisation: {type: String, required: true},
    messages: {type: [messages], required: true}
});

const discussion = model("Discussion", discussionSchema);

export {discussion};