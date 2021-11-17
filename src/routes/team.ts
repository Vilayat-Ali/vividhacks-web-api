/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, {Request, Response} from "express";
import {user} from "./../models/users";
import {team} from "./../models/team";
import {authenticateUser} from "./../middlewares/auth";

const teamRouter = express.Router();

// Getting team information
teamRouter.get("/get/info/:team", authenticateUser, async(req:Request, res:Response) => {
    try{
        const teamInfo = await team.findOne({organisation: req.user.organisation, team_name: req.params.team});
        res.json({"success": true, "team": teamInfo});
    }catch(err:any) {
        if(err) res.json({"success": false, "message": err.message});
    }
});

// Creating a new team
teamRouter.post("/create", authenticateUser, async(req:Request, res:Response) => {
try{
    // Team should be unique in an organisation and the person who creates it should be the leader 
    const ifTeamExists = await team.findOne({team_name: req.body.team_name, organisation: req.user.organisation});
    if(ifTeamExists!==null){ // record exists
        res.json({"success": false, "message": "Cannot create team with same name within the same organisation"});
    }else{ // record does not exists

        const teamUpdate = new team({
            team_name: req.body.team_name,
            organisation: req.user.organisation,
            description: req.body.description,
            members: [{
                username: req.user.username, 
                role: ["Team Leader"]
            }]
        });

        const savedTeam = await teamUpdate.save();

        const updateUser = await user.updateOne({email: req.user.email}, 
            {
                $push: {
                    member_of: {
                        team_name: req.body.team_name,
                        role: ["Team Leader"]
                    }
                }
            });

    res.json({"success": true, "meta": [savedTeam, updateUser]});
    }
}
catch(err:any) {
    if(err) res.json({"success": false, "message": err.message});
}
});

// Deleting a team
teamRouter.delete("/delete/:teamname", authenticateUser, async(req:Request, res:Response) => {
    try{
        const teamInfo = await team.deleteOne({team_name: req.params.teamname, organisation: req.user.organisation});
        res.json({"success": true, "message": `team deleted successfully!`, "meta": teamInfo});
    }catch(err:any) {
        if(err) res.json({"success": false, "message": err.message});
    }
});

// adding tasks to the team
teamRouter.post("/add/task", authenticateUser, async(req:Request, res:Response) => {
    try{
        const taskExists = await team.findOne({tasks:{$elemMatch: {taskname: req.body.taskname, organization: req.user.organization}}});
        if(taskExists!==null){
            const teamUpdate = await team.updateOne({team_name: req.body.team_name, organization: req.user.organization},{
                $push: {
                    tasks: {
                        taskname: req.body.taskname,
                        setBy: req.user.username
                    }
                }
            });
            res.json({"success": true, "message": teamUpdate});
        }else{
            res.json({"success": false, "message": "Task already exists!"})
        }
    }catch(err:any) {
        if(err) res.json({"success": false, "message": err.message});
    }
});

// deleting task from the team
teamRouter.delete("/delete/task", authenticateUser, async(req:Request, res:Response) => {
    try{
        const teamUpdate = await team.updateOne({team_name: req.body.team_name, organization: req.user.organization},{
                $pull: {tasks: {taskname: req.body.taskname}}
        });
            res.json({"success": true, "message": teamUpdate});
    }catch(err:any) {
        if(err) res.json({"success": false, "message": err.message});
    }
});

// storing messages in the database
teamRouter.post("/add/messages", authenticateUser, async(req:Request, res:Response) => {
    const messageModel = await team.updateOne({organisation: req.user.organisation, team_name: req.body.team_name})
});

export {teamRouter};