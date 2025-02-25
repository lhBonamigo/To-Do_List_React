"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskControllers_js_1 = require("../controllers/taskControllers.js");
const taskRouter = express_1.default.Router();
taskRouter.post('/add', taskControllers_js_1.addTask);
taskRouter.get('/tasks', taskControllers_js_1.getTasks);
taskRouter.post('/update', taskControllers_js_1.updateTask);
taskRouter.delete('/delete', taskControllers_js_1.deleteTask);
exports.default = taskRouter;
