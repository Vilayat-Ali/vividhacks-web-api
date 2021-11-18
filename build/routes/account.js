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
exports.accountRouter = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
// dependency 
var express_1 = __importDefault(require("express"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var auth_1 = require("./../middlewares/auth");
var accountRouter = express_1.default.Router();
exports.accountRouter = accountRouter;
// model
var users_1 = require("./../models/users");
// Get a specific user 
accountRouter.get("/get/user", auth_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var wantedUser, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, users_1.user.findOne({ "email": req.body.email, "organisation": req.body.organisation })];
            case 1:
                wantedUser = _a.sent();
                res.json({ "success": true, "user": wantedUser });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                if (err_1) {
                    res.json({ "success": false });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Register a user 
accountRouter.post("/register/user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userModel, accessToken, userdata, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userModel = new users_1.user({ username: req.body.username,
                    email: req.body.email,
                    description: req.body.description,
                    organisation: req.body.organisation,
                    password: bcryptjs_1.default.hashSync(req.body.password, 5) });
                accessToken = (0, auth_1.generateJWTToken)(req.body.username, req.body.email, req.body.organisation);
                if (!(accessToken !== null)) return [3 /*break*/, 2];
                return [4 /*yield*/, userModel.save()];
            case 1:
                userdata = _a.sent();
                // Saving cookie
                res.cookie("vividhacks", accessToken, { httpOnly: true }).json({ "success": true, "user": userdata, "accessToken": accessToken });
                return [3 /*break*/, 3];
            case 2:
                res.json({ "success": false, "message": "Failed to sign a JWT token for this user." });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                if (err_2) {
                    res.json({ "success": false, "message": err_2.message });
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// User login
accountRouter.post("/login/user", auth_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var suspectedUser, userAuth, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, users_1.user.findOne({ email: req.body.email })];
            case 1:
                suspectedUser = _a.sent();
                if (!(suspectedUser !== null)) return [3 /*break*/, 3];
                return [4 /*yield*/, bcryptjs_1.default.compare(req.body.password, suspectedUser.password)];
            case 2:
                userAuth = _a.sent();
                if (userAuth) {
                    res.json({ "success": true, "user": suspectedUser });
                }
                else {
                    res.json({ "success": false, "message": "Invalid password" });
                }
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                if (err_3)
                    res.json({ "success": false, "message": "User not found." });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Deleting the account
accountRouter.get("/delete/user", auth_1.authenticateUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idToBeDeleted, deletedUser, teamCreatedByUser, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                idToBeDeleted = req.user;
                return [4 /*yield*/, users_1.user.deleteOne({ idToBeDeleted: idToBeDeleted })];
            case 1:
                deletedUser = _a.sent();
                return [4 /*yield*/, users_1.user.findOneAndDelete({ username: req.user.username }, {
                        member_of: {
                            $elemMatch: {
                                role: "Team Leader"
                            }
                        }
                    })];
            case 2:
                teamCreatedByUser = _a.sent();
                res.json({ "success": true, "message": [deletedUser, teamCreatedByUser] });
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                if (err_4)
                    res.json({ "success": false, "message": err_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
