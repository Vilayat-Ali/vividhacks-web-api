// Dependencies 
import express, {Request, Response} from "express";
import mongoose from "mongoose";
import * as Env from "dotenv";
import cookieParser from "cookie-parser";

// Environment Variables
Env.config({path: __dirname+"/../.env"});


// app configs
const port = 8000 || process.env.PORT;

const app = express();

// Defining middlewares
app.use(express.json());
app.use(cookieParser());

// adding databases
mongoose.connect(process.env.DATABASEURI!, (err)=>{
    if(err) throw err;
    else console.log("Connected to DB!");
});

// importing routes
import {accountRouter} from "./routes/account";
import {teamRouter} from "./routes/team";

// Managing routes

app.get("/", (req:Request, res:Response) => {
    res.status(200).json({"status": "OK", "project": {
        "name": "TEAM MANAGEMENT WEB APP API",
        "author": "Syed Vilayat Ali Rizvi",
        "competition": "Vivid Hacks 2021",
        "team_members":[{
            "name": "Syed Vilayat Ali Rizvi",
            "email": "vilayatcodemysite@gmail.com",
            "role": ["Backend Engineer", "Database Administrator", "Team Leader"]
        },{
            "name": "Brayden Wright",
            "email": "brayden45.dev@gmail.com",
            "role": ["Front-End Engineer", "Team Leader"]
        },{
            "name": "Anant Kushyup",
            "email": "ananthkashyap4@gmail.com",
            "role": ["Frontend Engineer", "Research Lead"]
        },{
            "name": "Farhan Haider",
            "email": "riz4mix@gmail.com",
            "role": ["Graphic Designer", "Asset Manager"]
        }]
    }});
});

app.use("/account", accountRouter);
app.use("/team", teamRouter);

// app listening
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});