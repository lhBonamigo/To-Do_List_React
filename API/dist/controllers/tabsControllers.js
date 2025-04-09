import * as tabService from '../services/tabService.js';
export const addTab = async (req, res) => {
    try {
        const { name, description, user_id } = req.body;
        if (!name || !user_id)
            res.status(400).json({ erro: "Campos obrigatórios" });
        await tabService.createTab({ name, description, user_id });
        res.status(201).json({ success: "Tab criada com sucesso" });
    }
    catch (err) {
        res.status(500).json({ erro: "Erro ao criar tab", err });
    }
};
export const updateTabs = async (req, res) => {
    try {
        const { name, description, user_id, id } = req.body;
        if (!name || !description)
            res.status(400).json({ erro: "Campos obrigatórios" });
        await tabService.updateTab({ name, description, user_id }, Number(id));
        res.status(200).json({ success: "Tab atualizada com sucesso" });
    }
    catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar tab", err });
    }
};
export const deleteTabs = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id)
            res.status(400).json({ erro: "Id obrigatório" });
        await tabService.deleteTabs(Number(id));
        res.status(200).json({ success: "Tab deletada com sucesso" });
    }
    catch (err) {
        res.status(500).json({ erro: "Erro ao deletar tab", err });
    }
};
export const getTabs = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id)
            res.status(400).json({ erro: "Id obrigatório" });
        const tabs = await tabService.getTabs(Number(id));
        res.status(200).json(tabs);
    }
    catch (err) {
        res.status(500).json({ erro: "Erro ao buscar tabs", err });
    }
};
