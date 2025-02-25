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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const database_js_1 = __importDefault(require("../config/database.js"));
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario, pass } = req.body;
        if (!usuario || !pass) {
            res.status(400).json({ erro: "usuario ou senha inválidos" });
        }
        const sql = "INSERT INTO logins value(?, ?, ?)";
        database_js_1.default.query(sql, ["id", usuario, pass], (err, results) => {
            if (err) {
                console.log("erro ao executar query:", err);
                return res.status(400).json(err);
            }
            return res.status(201).json({ message: "success" });
        });
    }
    catch (error) {
        console.log("erro interno", error.message);
        res.status(500).json({ erro: "erro interno do servidor" });
    }
}));
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario, pass } = req.body;
        if (!usuario || !pass) {
            res.status(400).json({ "erro": "usuário e senha requeridas" });
        }
        const sql = "SELECT * FROM logins WHERE user = ? AND pass = ?";
        database_js_1.default.query(sql, [usuario, pass], (err, results) => {
            if (err) {
                console.error('Erro ao executar a query:', err);
                return res.status(500).json({ error: 'Erro no servidor',
                    results
                });
            }
            if (results.length > 0) {
                res.status(200).json({ message: 'Success', results });
            }
            else {
                res.status(404).json({ error: 'Usuário ou senha incorretos' });
            }
        });
    }
    catch (error) {
        console.error('Erro interno:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}));
