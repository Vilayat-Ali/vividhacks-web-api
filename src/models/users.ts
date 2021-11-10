// User Model


import {Schema, model} from "mongoose";

interface partofI{
    team_name: string,
    role: string[]
}


interface userSchemaI{
    username: string,
    email: string,
    description: string,
    organisation: string,
    password: string,
    member_of: partofI[]
}

const partOfSchema = new Schema({
    team_name: {type: String, required: true},
    role: {type: [String]}
})

const userSchema = new Schema<userSchemaI>({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    description: {type: String, default: `Hi! Busy at work!`},
    organisation: {type: String, default: "Another FaceBook INC"},
    password: {type: String, required: true},
    member_of: {type: [partOfSchema]}
});

const user = model("User", userSchema);

export {user};
