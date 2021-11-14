/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, {Request, Response} from "express";
import {user} from "./../models/users";
import {team} from "./../models/team";
import {authenticateUser} from "./../middlewares/auth";

const teamRouter = express.Router();

// get all members
teamRouter.get("/get/info/about/:teamname", authenticateUser, async(req:Request, res:Response)=>{
try{
    const teamname = req.params.teamname;
    const teamInfo = await team.findOne({organisation: req.user.organisation, teamname: teamname});
    res.json({"success": true, "team": teamInfo});
}catch(err:any){
    if(err) res.json({"success": false, "message": err.message});
}
});

// create team 
teamRouter.get("/create/team", authenticateUser, async(req:Request, res:Response) => {
    try{
        const teamModel = new team({
                            teamName: req.body.teamName,
                            organisation: req.user.organisation,
                            description: req.body.description,
                            members: [{username: req.user.username, role: ["Team Leader"]}]
                        });
        const createdTeam = await teamModel.save((err:any)=>{
            if(err) res.json({"success": false, "message": err.message});
        });
        const editCreatorProfile = await user.updateOne({email: req.user.email},
                                                        {$push: {member_of:{team_name: teamModel.teamName, role: ["Team Leader"]}}});

        res.json({"success": true, "message": `Team created successfully!`, "meta": [createdTeam, editCreatorProfile]});
    }catch(err:any){
        if(err) res.json({"success": false, "message": err.message});
    }
});

// add teammate
teamRouter.get("/add/member/to/:team", authenticateUser, async(req:Request, res:Response) => {
try{
    const teamnametojoin = req.params.team;
    // Adding info to user model
    const addedMember = await user.updateOne({email: req.body.email}, 
                                            {$push: {member_of: {team_name: teamnametojoin, role: req.body.role}}
                                        });
    // Adding info to teams model
    const addedTeam = await team.updateOne({organisation: req.user.organisation, teamName: teamnametojoin}, 
                                        {$push: {member: {username: req.body.username, role: req.body.role}}});

    res.json({"success": true, "message": "User added successfully!", "meta": addedMember});
}catch(err:any){
    if(err) res.json({"success": false, "message": err.message});
}
});

// delete team
teamRouter.get("/test/:team", authenticateUser, async(req:Request, res:Response) => {
    try{    
        const isLeader:any = await team.findOne({teamName: req.params.team}, 
                                            {
                                                members: 
                                                {
                                                    $elemMatch: {
                                                    role: "Team Leader"
                                                }
                                            }
                                        });
        if(isLeader.members.length===0) res.json({"success": true, "message": "User not Authorized!"});
        else{
            const deleteTeam = await team.deleteOne({teamName: req.params.team});
            res.json({"success": true, "message": "Team deleted successfully!", "meta": deleteTeam});
        }
    }catch(err:any){
        if(err) res.json({"success": false, "message": err.message});
    }
    });

export {teamRouter};