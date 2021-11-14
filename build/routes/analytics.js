"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsRouter = void 0;
var express_1 = __importDefault(require("express"));
var analyticsRouter = express_1.default.Router();
exports.analyticsRouter = analyticsRouter;
analyticsRouter.get("/", function (req, res) {
    res.json({ success: "OK" });
});
