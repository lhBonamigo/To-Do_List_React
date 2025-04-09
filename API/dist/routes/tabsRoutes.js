import express from 'express';
import { addTab, updateTabs, deleteTabs, getTabs } from '../controllers/tabsControllers.js';
const tabsRouter = express.Router();
tabsRouter.post('/add', addTab);
tabsRouter.get('/tabs', getTabs);
tabsRouter.put('/update', updateTabs);
tabsRouter.delete('/delete', deleteTabs);
export default tabsRouter;
