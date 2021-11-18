import {Schema, model} from "mongoose";

interface membersI{
    username: string,
    role: string[]
}

interface messagesI{
    receiver: string,
    sender: string,
    message: string,
    date: string
}

interface taskI{
    taskname: string,
    setBy: string,
    deadline: string
}

interface teamSchemaI{
    team_name: string,
    description: string,
    organisation: string,
    tasks: taskI[],
    members: membersI[], 
    messages: messagesI[]
}

const members = new Schema<membersI>({
    username: {type: String, required: true},
    role: {type: [String], required: true},
});

const taskSchema = new Schema<taskI>({
    taskname: {type: String, required: true},
    setBy: {type: String, required: true},
    deadline: {type: String},
})

const messages = new Schema<messagesI>({
    receiver: {type: String, required: true},
    sender: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: String}
})

const teamSchema = new Schema<teamSchemaI, taskI, messagesI>({
    team_name: {type:String, required: true},
    organisation: {type: String, required: true},
    description: {type:String, default: "Description of the team..."},
    tasks: {type: [taskSchema]},
    members: {type: [members]},
    messages: {type: [messages]}
});

const team = model("team", teamSchema);

export {team};