"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const taskRoutes_js_1 = __importDefault(require("./routes/taskRoutes.js"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
dotenv_1.default.config({ path: '../.env' });
app.use(express_1.default.json());
const port = process.env.PORT;
app.use('/user', userRoutes_js_1.default);
app.use('/task', taskRoutes_js_1.default);
app.listen(port, () => {
    console.log(`Server on In port ${port}`);
});
