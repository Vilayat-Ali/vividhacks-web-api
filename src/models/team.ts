import {Schema, model} from "mongoose";


interface memberI{
    username: string,
    role: string[]
}

interface teamI{
    teamName: string,
    organisation: string,
    description?: string,
    members: memberI,
    tasks?: string[]
}

const memberSchema = new Schema<memberI>({
    username: {type: String, required: true},
    role: {type: [String]}
});

const teamSchema = new Schema<teamI>({
    teamName: {type: String, required: true, unique: true},
    organisation: {type: String, required: true},
    description: {type: String, default: "We are a team of hardworking individuals!"},
    tasks: {type: [String]},
    members: [memberSchema]
});

const team = model("Teams", teamSchema);

export {team};