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
exports.deleteTask = exports.updateTask = exports.addTask = exports.getTasks = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const database_js_1 = __importDefault(require("../config/database.js"));
exports.getTasks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const sql = "SELECT * FROM task WHERE user_id = ?;";
        database_js_1.default.query(sql, [id], (err, results) => {
            if (err) {
                res.status(500).json({ erro: "erro de banco de dados" });
            }
            res.status(200).send(results);
        });
    }
    catch (error) {
        console.log("erro de servidor", error);
        res.status(500).send({ erro: "erro de servidor" });
    }
}));
exports.addTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { novaTarefa, deadline, userID, states } = req.body;
        if (!novaTarefa) {
            res.status(400);
        }
        const sql = "INSERT INTO task(task, deadline, user_id, status) VALUES (?, ?, ?, ?)";
        database_js_1.default.query(sql, [novaTarefa, deadline, userID, states], (err, results) => {
            if (err) {
                console.log("erro de query nas tasks:", err);
                return res.status(500).json({ erro: err });
            }
            return res.status(200).json({ sucess: "Task Adicionada" });
        });
    }
    catch (error) {
        console.log("erro no servidor", error);
        res.status(500).json({ erro: "erro de servidor" });
    }
}));
exports.updateTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, status } = req.body;
        const sql = "UPDATE task SET status = ? WHERE id = ?;";
        database_js_1.default.query(sql, [status, id], (err, results) => {
            if (err) {
                console.error('Erro ao executar a query:', err);
                return res.status(500).json({ error: 'Erro no servidor',
                    results
                });
            }
            if (results.affectedRows > 0) {
                res.status(200).json({ results });
            }
            else {
                console.log(results);
                res.status(404).json({ error: 'erro ao mudar status da query' });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ erro: "Erro de servidor", error });
    }
}));
exports.deleteTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const sql = "DELETE FROM task WHERE id = ?";
        database_js_1.default.query(sql, [id], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ erro: err });
            }
            res.status(200).json({ sucess: "DELETADO COM SUCESSO" });
        });
    }
    catch (err) {
        res.status(500).json({ erro: "Erro de servidor" });
    }
}));
