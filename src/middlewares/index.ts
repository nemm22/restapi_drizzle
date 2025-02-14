import express from 'express';
import {get, identity, merge} from 'lodash';
import { getUserBySessionToken } from '../models/users';
import { getTodoById } from '../models/todos';
import { getPostbyId } from '../models/posts';


declare global{
    namespace Express {
        export interface Request{
            identity?: string
        }
    }
}

export const isOwner = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {id} = req.params;
        const curentUserId = get(req, 'identity.id') as String;

        if(!curentUserId){
            return res.sendStatus(403);
        }

        if(curentUserId!=id){
            return res.sendStatus(403);
        }
        console.log('owner');
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const isAuthenticated = async(req: express.Request, res:express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['NEMANJA-AUTH'];

        if(!sessionToken){
            return res.sendStatus(403);
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        
        if(!existingUser){
            return res.sendStatus(403);
        }

        merge(req,{identity: existingUser});
        console.log('authenticated');
        next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const ownsTodo = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {id} = req.body;
        const sessionToken = req.cookies['NEMANJA-AUTH'];

        if(!sessionToken){
            console.log('No token');
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        const currentTask = await getTodoById(id);

        if(!existingUser){
            console.log('No user');
            return res.sendStatus(403);
        }

        if(!currentTask){
            console.log('No task');
            return res.sendStatus(403);
        }

        if(existingUser.id != currentTask.userId){
            return res.status(403).json({message: 'Not owned by user'});
        }

        return next();

        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const ownsPost = async(req:express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        const {id} = req.body;
        const sessionToken = req.cookies['NEMANJA-AUTH'];

        if(!id || !sessionToken){
            return res.status(403);
        }

        const currentUser = await getUserBySessionToken(sessionToken);
        const currentPost = await getPostbyId(id);

        if(!currentUser || !currentPost){
            return res.status(403);
        }

        if(currentUser.id !== currentPost.userId ){
            return res.status(403);
        }

        console.log('User owns post')
        return next();
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}




