import express, {Request, Response} from "express";

const analyticsRouter = express.Router();


analyticsRouter.get("/", (req:Request, res:Response) => {
    res.json({success: "OK"})
});

export {analyticsRouter};