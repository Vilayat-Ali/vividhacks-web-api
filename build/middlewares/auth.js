"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.generateJWTToken = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
var jsonwebtoken_1 = require("jsonwebtoken");
function generateJWTToken(username, email, organisation) {
    try {
        if (organisation === undefined)
            return (0, jsonwebtoken_1.sign)({ username: username, email: email, organisation: "Another FaceBook INC" }, process.env.SECRETKEY);
        else
            return (0, jsonwebtoken_1.sign)({ username: username, email: email, organisation: organisation }, process.env.SECRETKEY);
    }
    catch (err) {
        if (err)
            return null;
    }
}
exports.generateJWTToken = generateJWTToken;
function authenticateUser(req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(" ")[1];
    if (token === null)
        return res.json({ "success": false, "message": "User not authorized!" });
    (0, jsonwebtoken_1.verify)(token, process.env.SECRETKEY, function (err, user) {
        if (err)
            throw err;
        req.user = user;
    });
    next();
}
exports.authenticateUser = authenticateUser;
