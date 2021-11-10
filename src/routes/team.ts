import express, {Request, Response} from "express";

const teamRouter = express.Router();


teamRouter.get("/", (req:Request, res:Response) => {
    res.cookie("hello", "Ali", {httpOnly: true}).json({success: "OK"})
});

export {teamRouter};