// User Model


import {Schema, model} from "mongoose";

interface userSchemaI{
    username: string,
    email: string,
    description: string,
    organisation: string,
    role: string[]
}

const userSchema = new Schema<userSchemaI>({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    description: {type: String, default: `Hi! Busy at work!`},
    organisation: {type: String, default: "Another FaceBook INC"},
    role: {type: [String]}
});

const user = model("User", userSchema);

export {user};
