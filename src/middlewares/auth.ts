/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'express-serve-static-core' {
    interface Request {
      user?: any
    } 
  }

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {verify, sign} from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";

export function generateJWTToken(username:string, email:string, organisation:string){
    try{
            return sign({ username, email, organisation }, process.env.SECRETKEY!);
    }catch(err){
        if(err) return null;
    }
}

export function authenticateUser(req:Request, res:Response, next:NextFunction){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(token === null) return res.json({"success": false, "message": "User not authorized!"});

    verify(token!, process.env.SECRETKEY!, (err:any, user:any)=>{
        if(err) throw err;
        req.user = user;
    });

    next();
}
