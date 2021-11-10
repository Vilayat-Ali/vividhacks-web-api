// dependency 
import express, {Request, Response} from "express";

const accountRouter = express.Router();

// model
import {user} from "./../models/users";

// Get a specific user 
accountRouter.get("/get/user", async(req:Request, res:Response) => {
    try{
        const wantedUser:unknown = await user.findOne({"username": req.body.username, "organisation": req.body.organisation});
        res.json({"success": "OK", "user": wantedUser});
    }catch(err){
        if(err){
            res.json({"success": "ERROR"});
        }
    }
});

// Register a user 
accountRouter.post("/register/user", async(req:Request, res:Response) => {
    try{
        const userModel = await new user(   {username: req.body.username,
                                            email: req.body.email,
                                            description: req.body.description,
                                            organisation: req.body.organisation,
                                            role: req.body.role}    );

        await userModel.save((err)=>{
            if(!err) res.json({"success": "OK", "user": userModel});
        });
    }catch(err){
        if(err){
            res.json({"success": "ERROR"});
        }
    }
});

export {accountRouter};