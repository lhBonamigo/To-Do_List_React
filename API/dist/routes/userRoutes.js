"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_js_1 = require("../controllers/userControllers.js");
const userRouter = express_1.default.Router();
userRouter.post('/register', userControllers_js_1.registerUser);
userRouter.post('/login', userControllers_js_1.loginUser);
exports.default = userRouter;
