/* eslint-disable @typescript-eslint/no-explicit-any */
// dependency 
import express, {Request, Response} from "express";
import bcryptjs from "bcryptjs"
import { generateJWTToken, authenticateUser} from "./../middlewares/auth";

const accountRouter = express.Router();

// model
import {user} from "./../models/users";

// Get a specific user 
accountRouter.get("/get/user", authenticateUser, async(req:Request, res:Response) => {
    try{
        const wantedUser:unknown = await user.findOne({"email": req.body.email, "organisation": req.body.organisation});
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
                                        password: bcryptjs.hashSync(req.body.password, 5)}    );

        const accessToken = generateJWTToken(req.body.username, req.body.email, req.body.organisation);
        
        if(accessToken !== null){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userdata = await userModel.save();

        // Saving cookie
        res.cookie("vividhacks", accessToken, {httpOnly: true}).json({"success": true, "user": userdata, "accessToken": accessToken});
    }else{
        res.json({"success": false, "message": "Failed to sign a JWT token for this user."})
    }
        } // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(err:any){
                    if(err){
                        res.json({"success": false, "message": err.message});
                    }
    }
});

// User login
accountRouter.post("/login/user", authenticateUser, async(req:Request, res:Response) => {
try{
    const suspectedUser = await user.findOne({email: req.body.email}); // Suspected user
    if(suspectedUser!==null){
        const userAuth = await bcryptjs.compare(req.body.password, suspectedUser.password);
        if(userAuth){
            res.json({"success": true, "user": suspectedUser});
        }else{
            res.json({"success": false, "message": "Invalid password"});
        }
    }
}catch(err){
    if(err) res.json({"success": false, "message": "User not found."})
}
});

// Deleting the account
accountRouter.get("/delete/user", authenticateUser, async(req:Request, res:Response)=>{
try{
    const idToBeDeleted = req.user;
    // Deleting user
    const deletedUser = await user.deleteOne({idToBeDeleted});
    // deleting teams associated with the user
    const teamCreatedByUser = await user.findOneAndDelete({username: req.user.username}, {
        member_of: {
            $elemMatch: {
                role: "Team Leader"
            }
        }
    });
    res.json({"success": true, "message": [deletedUser, teamCreatedByUser]});
}catch(err:any){
    if(err) res.json({"success": false, "message": err.message});
}
});

export {accountRouter};