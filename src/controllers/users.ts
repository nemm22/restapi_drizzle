import express from 'express';
import { deleteUserById, getUserBySessionToken, getUsers, updateUserById } from '../models/users';

export const getAllUsers = async(req: express.Request,res: express.Response) => {
    try {
        var users = await getUsers();

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async(req: express.Request, res: express.Response) => {
    try {
        
        const currentUser = await getUserBySessionToken(req.cookies['NEMANJA-AUTH']);
        const id = currentUser.id;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const updateUser = async(req: express.Request, res: express.Response) => {
    try {
        const {username} = req.body;

        const currentUser = await getUserBySessionToken(req.cookies['NEMANJA-AUTH']);
        console.log(currentUser);
        const id = currentUser.id;

        if(!username){
            return res.sendStatus(400);
        }

        currentUser.username = username;

        const updatedUser = updateUserById(id, currentUser);
        return res.json(updatedUser);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}





