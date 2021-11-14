/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// Dependencies 
import express, {Request, Response} from "express";
import mongoose from "mongoose";
import * as Env from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Environment Variables
Env.config({path: __dirname+"/../.env"});

const app = express();

const port = 8000||process.env.PORT;

// Defining middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// adding databases
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
try{
    mongoose.connect(process.env.DATABASEURI!, (err)=>{
        if(err) throw err;
        else console.log("Connected to DB!");
    });
}catch(err:any){
    console.log(err.message)
}

// importing routes
import {accountRouter} from "./routes/account";
import {teamRouter} from "./routes/team";
import {analyticsRouter} from "./routes/analytics";

// Managing routes
app.get("/", (req:Request, res:Response) => {
    res.json(
        {
            "status": "OK", 
            "project": {
            "name": "TEAM MANAGEMENT WEB APP API",
            "author": "Syed Vilayat Ali Rizvi",
            "competition": "Vivid Hacks 2021",
            "team_members":[
            {
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
            }
        ]
    }
});
});

app.use("/account", accountRouter);
app.use("/team", teamRouter);
app.use("/analytics", analyticsRouter);

// app listening
app.listen(port, process.env.HOST||"0.0.0.0", ()=>{
    console.log(`Server running on http://localhost:${port}`);
});