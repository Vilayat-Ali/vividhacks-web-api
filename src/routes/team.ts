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
    const teamModel = new team({
        team_name: req.body.team_name,
        description: req.body.description,
        members: {
            username: req.user.username, 
            role: ["Team Leader"]
        }
    });

    const teamifExist = await team.findOne({team_name: req.body.team_name, organisation: req.user.organisation});

    if(teamifExist){
        const teamSaved = await teamModel.save();
        res.json({"success": true, "team": teamModel, "meta": teamSaved});
    }else{
        res.json({"success": false, "message": "Cannot create team with same name within same"});
    }
}catch(err:any) {
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
        const teamModel = await team.updateOne({team_name: req.params.teamname, organisation: req.user.organisation}, {
                                                        $push: {tasks: {
                                                            taskname: req.body.taskname,
                                                            setBy: req.user.username
                                                        }
                                                    }
                                                });

        res.json({"success": true, "task": req.body.taskname});
    }catch(err:any) {
        if(err) res.json({"success": false, "message": err.message});
    }
});

// deleting task from the team
teamRouter.delete("/delete/task/:taskname", authenticateUser, async(req:Request, res:Response) => {
    try{
        const teamModel = await team.updateOne({team_name: req.params.teamname, organisation: req.user.organisation}, {
                                                        $pull: {tasks: {
                                                            taskname: req.params.taskname
                                                        }
                                                    }
                                                });

        res.json({"success": true, "task": `${req.body.taskname} removed successfully!`});
    }catch(err:any) {
        if(err) res.json({"success": false, "message": err.message});
    }
});

// storing messages in the database
teamRouter.post("/add/messages", authenticateUser, async(req:Request, res:Response) => {
    const messageModel = await team.updateOne({organisation: req.user.organisation, team_name: req.body.team_name})
});

export {teamRouter};