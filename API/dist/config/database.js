"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
const pool = mysql2_1.default.createPool({
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexões no pool
    queueLimit: 0 // Sem limite de requisições na fila
});
exports.default = pool;
