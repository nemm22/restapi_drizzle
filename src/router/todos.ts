import { deleteTodo, getUsersTodos, newTodo, updateTodo } from '../controllers/todos';
import  express from 'express';
import { isAuthenticated, isOwner, ownsTodo } from '../middlewares';


export default (router: express.Router) => {
    router.get('/todos/', isAuthenticated, getUsersTodos);
    router.post('/todos/',isAuthenticated, newTodo);
    router.patch('/todos/', isAuthenticated, ownsTodo,updateTodo);
    router.delete('/todos/',isAuthenticated, ownsTodo,deleteTodo);
}