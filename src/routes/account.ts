// dependency 
import express, {Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs"
import cookieParser from "cookie-parser";

const accountRouter = express.Router();

// model
import {user} from "./../models/users";

// Get a specific user 
accountRouter.get("/get/user", async(req:Request, res:Response) => {
    try{
        const wantedUser:unknown = await user.findOne({"username": req.body.username, "organisation": req.body.organisation});
        res.json({"success": true, "user": wantedUser});
    }catch(err){
        if(err){
            res.json({"success": false});
        }
    }
});

// Register a user 
accountRouter.post("/register/user", async(req:Request, res:Response) => {
    try{
        const userModel = new user(   {username: req.body.username,
                                            email: req.body.email,
                                            description: req.body.description,
                                            organisation: req.body.organisation,
                                            password: bcryptjs.hashSync(req.body.password, 5),
                                            role: req.body.role}    );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await userModel.save((err:any) => {
            if (err)
                res.json({ "success": false, "message": err.message });
        });

        const accessToken = jwt.sign({
                                        username: req.body.username,
                                        email: req.body.email,
                                        organisation: req.body.organisation
                                    }, process.env.SECRETKEY!);
        
        // Saving cookie
        res.cookie("team-management-app-user-data", accessToken, {httpOnly: true}).json({"success": true, "user": userModel});

        } // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(err:any){
                    if(err){
                        res.json({"success": false, "message": err.message});
                    }
    }
});


export {accountRouter};