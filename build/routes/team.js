"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRouter = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
var express_1 = __importDefault(require("express"));
var users_1 = require("./../models/users");
var team_1 = require("./../models/team");
var auth_1 = require("./../middlewares/auth");
var teamRouter = express_1.default.Router();
exports.teamRouter = teamRouter;
// get all members
teamRouter.get("/get/info/about/:teamname", auth_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var teamname, teamInfo, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                teamname = req.params.teamname;
                return [4 /*yield*/, team_1.team.findOne({ organisation: req.user.organisation, teamname: teamname })];
            case 1:
                teamInfo = _a.sent();
                res.json({ "success": true, "team": teamInfo });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                if (err_1)
                    res.json({ "success": false, "message": err_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// create team 
teamRouter.get("/create/team", auth_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var teamModel, createdTeam, editCreatorProfile, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                teamModel = new team_1.team({
                    teamName: req.body.teamName,
                    organisation: req.user.organisation,
                    description: req.body.description,
                    members: [{ username: req.user.username, role: ["Team Leader"] }]
                });
                return [4 /*yield*/, teamModel.save(function (err) {
                        if (err)
                            res.json({ "success": false, "message": err.message });
                    })];
            case 1:
                createdTeam = _a.sent();
                return [4 /*yield*/, users_1.user.updateOne({ email: req.user.email }, { $push: { member_of: { team_name: teamModel.teamName, role: ["Team Leader"] } } })];
            case 2:
                editCreatorProfile = _a.sent();
                res.json({ "success": true, "message": "Team created successfully!", "meta": [createdTeam, editCreatorProfile] });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                if (err_2)
                    res.json({ "success": false, "message": err_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// add teammate
teamRouter.get("/add/member/to/:team", auth_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var teamnametojoin, addedMember, addedTeam, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                teamnametojoin = req.params.team;
                return [4 /*yield*/, users_1.user.updateOne({ email: req.body.email }, { $push: { member_of: { team_name: teamnametojoin, role: req.body.role } }
                    })];
            case 1:
                addedMember = _a.sent();
                return [4 /*yield*/, team_1.team.updateOne({ organisation: req.user.organisation, teamName: teamnametojoin }, { $push: { member: { username: req.body.username, role: req.body.role } } })];
            case 2:
                addedTeam = _a.sent();
                res.json({ "success": true, "message": "User added successfully!", "meta": addedMember });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                if (err_3)
                    res.json({ "success": false, "message": err_3.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// delete team
teamRouter.get("/test/:team", auth_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isLeader, deleteTeam, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, team_1.team.findOne({ teamName: req.params.team }, {
                        members: {
                            $elemMatch: {
                                role: "Team Leader"
                            }
                        }
                    })];
            case 1:
                isLeader = _a.sent();
                if (!(isLeader.members.length === 0)) return [3 /*break*/, 2];
                res.json({ "success": true, "message": "User not Authorized!" });
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, team_1.team.deleteOne({ teamName: req.params.team })];
            case 3:
                deleteTeam = _a.sent();
                res.json({ "success": true, "message": "Team deleted successfully!", "meta": deleteTeam });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                if (err_4)
                    res.json({ "success": false, "message": err_4.message });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
