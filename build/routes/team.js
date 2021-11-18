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
// Getting team information
teamRouter.get("/get/info/:team", auth_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var teamInfo, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, team_1.team.findOne({ organisation: req.user.organisation, team_name: req.params.team })];
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
// Creating a new team
teamRouter.post("/create", auth_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ifTeamExists, teamUpdate, savedTeam, updateUser, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, team_1.team.findOne({ team_name: req.body.team_name, organisation: req.user.organisation })];
            case 1:
                ifTeamExists = _a.sent();
                if (!(ifTeamExists !== null)) return [3 /*break*/, 2];
                res.json({ "success": false, "message": "Cannot create team with same name within the same organisation" });
                return [3 /*break*/, 5];
            case 2:
                teamUpdate = new team_1.team({
                    team_name: req.body.team_name,
                    organisation: req.user.organisation,
                    description: req.body.description,
                    members: [{
                            username: req.user.username,
                            role: ["Team Leader"]
                        }]
                });
                return [4 /*yield*/, teamUpdate.save()];
            case 3:
                savedTeam = _a.sent();
                return [4 /*yield*/, users_1.user.updateOne({ email: req.user.email }, {
                        $push: {
                            member_of: {
                                team_name: req.body.team_name,
                                role: ["Team Leader"]
                            }
                        }
                    })];
            case 4:
                updateUser = _a.sent();
                res.json({ "success": true, "meta": [savedTeam, updateUser] });
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_2 = _a.sent();
                if (err_2)
                    res.json({ "success": false, "message": err_2.message });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// Deleting a team
teamRouter.delete("/delete/:teamname", auth_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var teamInfo, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, team_1.team.deleteOne({ team_name: req.params.teamname, organisation: req.user.organisation })];
            case 1:
                teamInfo = _a.sent();
                res.json({ "success": true, "message": "team deleted successfully!", "meta": teamInfo });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                if (err_3)
                    res.json({ "success": false, "message": err_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// adding tasks to the team
teamRouter.patch("/add/task", auth_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskExists, teamUpdate, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, team_1.team.findOne({ tasks: { $elemMatch: { taskname: req.body.taskname, organization: req.user.organization } } })];
            case 1:
                taskExists = _a.sent();
                if (!!taskExists) return [3 /*break*/, 3];
                return [4 /*yield*/, team_1.team.updateOne({ team_name: req.body.team_name, organization: req.user.organization }, {
                        $push: {
                            tasks: {
                                taskname: req.body.taskname,
                                deadline: req.body.deadline,
                                setBy: req.user.username
                            }
                        }
                    })];
            case 2:
                teamUpdate = _a.sent();
                res.json({ "success": true, "message": teamUpdate });
                return [3 /*break*/, 4];
            case 3:
                res.json({ "success": false, "message": "Task already exists!" });
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
// deleting task from the team
teamRouter.patch("/delete/task", auth_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var teamUpdate, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, team_1.team.updateOne({ team_name: req.body.team_name, organization: req.user.organization }, {
                        $pull: { tasks: { taskname: req.body.taskname } }
                    })];
            case 1:
                teamUpdate = _a.sent();
                res.json({ "success": true, "message": teamUpdate });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                if (err_5)
                    res.json({ "success": false, "message": err_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// storing messages in the database
teamRouter.post("/add/messages", auth_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var messageModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, team_1.team.updateOne({ organisation: req.user.organisation, team_name: req.body.team_name })];
            case 1:
                messageModel = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
