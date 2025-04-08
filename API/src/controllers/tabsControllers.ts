import { Request, Response } from 'express';
import * as tabService from '../services/tabService.js';

export const addTab = async (req: Request, res: Response) => {
    try {
      const { name, description, user_id } = req.body;
      if (!name || !user_id) return res.status(400).json({ erro: "Campos obrigatórios" });
  
      await tabService.createTab({ name, description, user_id });
      res.status(201).json({ success: "Tab criada com sucesso" });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao criar tab", err });
    }
};

export const updateTabs = async (req: Request, res: Response)=>{
    try {
        const { name, description, user_id, id } = req.body;
        if (!name || !description) return res.status(400).json({ erro: "Campos obrigatórios" });

        await tabService.updateTab({ name, description, user_id }, Number(id));
        res.status(200).json({ success: "Tab atualizada com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar tab", err });
    }
}

export const deleteTabs = async (req: Request, res: Response) =>{
    try{
        const { id } = req.query;
        if(!id) return res.status(400).json({erro: "Id obrigatório"});
        await tabService.deleteTabs(Number(id));
        res.status(200).json({success: "Tab deletada com sucesso"});
    }catch(err){
        res.status(500).json({ erro: "Erro ao deletar tab", err });
    }
}

const getTabs = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ erro: "Id obrigatório" });
        const tabs = await tabService.getTabs(Number(id));
        res.status(200).json(tabs);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar tabs", err });
    }
}