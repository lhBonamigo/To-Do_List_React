import asyncHandler from 'express-async-handler';
import pool from '../config/database.js';

export const getTasks = asyncHandler(async(req, res) => {
    try {
        const { id } = req.query;
        const sql = "SELECT * FROM task WHERE user_id = ?;"
        pool.query(sql, [id], (err, results) => {
            if (err) {
                res.status(500).json({ erro: "erro de banco de dados" })
            }
            res.status(200).send(results);
        })
    } catch (error) {
        console.log("erro de servidor", error)
        res.status(500).send({ erro: "erro de servidor" })
    }
});

export const addTask = asyncHandler(async(req, res) => {
    try {
        const { content, tab_task, repetitions, estimatedTime, deadline, status, id } = req.body;
        if (!content) {
            res.status(400)
        }

        const sql = "INSERT INTO task(content, deadline, user_id, status, tab_task, repetitions, hours) VALUES (?, ?, ?, ?, ?, ?, ?)"

        pool.query(sql, [content, deadline, id, status, tab_task, repetitions, estimatedTime], (err, results) => {
            if (err) {
                return res.status(500).json({ erro: err })
            }
            return res.status(201).json({ sucess: "Tarefa Criada" })
        })
    } catch (error) {
        console.log("erro no servidor", error)
        res.status(500).json({ erro: "erro de servidor" })
    }
});

export const updateTask = asyncHandler(async(req, res)=>{
    try {
        const {content, tab_task, repetitions, estimatedTime, deadline, status, id} = req.body;
        const sql = "UPDATE task SET status = ?, content = ?, deadline = ?, tab_task = ?, repetitions = ?, hours = ? WHERE id = ?;"
        pool.query(sql, [status, content, deadline, tab_task, repetitions, estimatedTime, id], (err, results)=>{
            if (err) {
                return res.status(500).json({ error: 'Erro no servidor',
                    results
                });
            }

            if ((results as any).affectedRows > 0) {
                res.status(200).json({results });
            } else {
                console.log(results)
                res.status(404).json({ error: 'erro ao mudar status da query' });
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({erro: "Erro de servidor", error})
    }
});

export const deleteTask = asyncHandler(async(req, res) => {
    try {
        const { id } = req.body;
        const sql = "DELETE FROM task WHERE id = ?";
        pool.query(sql, [id], (err, results) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ erro: err })
            }

            res.status(200).json({ sucess: "DELETADO COM SUCESSO" });
        })
    }catch(err){
        res.status(500).json({erro: "Erro de servidor"})
    }
});