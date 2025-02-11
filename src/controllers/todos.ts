import express from 'express';
import {getTodosByUserId,getTodoById,updateTodoById,deleteTodoById,todos,createTodo} from '../models/todos';
import { InferInsertModel } from "drizzle-orm";


export const getUsersTodos = async (req: express.Request, res: express.Response) => {
    try {

        const {id} = req.params;

        console.log(id);

        const todos = await getTodosByUserId(parseInt(id));

        if(!todos || todos.length === 0){
            return res.status(404).json({message: 'No todos'});
        }

        return res.status(200).json(todos);
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const newTodo = async (req: express.Request, res: express.Response) => {
    try {

        const {title, description} = req.body;
        const {id} = req.params;

        if(!title){
            return res.status(400).json({message: 'Incorrect parameter input'});
        }

        var todo = await createTodo({title:title, userId:parseInt(id)});
        console.log('todo kreiran');
        todo.description = description;
        const updatedTodo = await updateTodoById(todo.id, todo);
        
        return res.status(200).json(todo).end();
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateTodo = async (req: express.Request, res: express.Response) => {
    try {
        const{id} = req.body;

        const todo = await getTodoById(id);
        todo.completed = true;
        const updatedTodo = await updateTodoById(id,todo);

        return res.status(200).json(updatedTodo).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteTodo = async(req: express.Request, res: express.Response) => {
    try {
        
        const{id} = req.body;


        const deletedTodo = await deleteTodoById(id);

        return res.json(deletedTodo);

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}
