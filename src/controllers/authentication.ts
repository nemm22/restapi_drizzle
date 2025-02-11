import express from 'express';
import { createUser, getUserByEmail, updateUserById } from '../models/users';
import { random , authentication, createSessionToken, verifyPassword} from '../helpers';

export const login = async(req: express.Request, res: express.Response) => {
    try {
        const {email,password} = req.body;

        if(!email || !password){
            res.sendStatus(400);
            console.log("no username or password");
        }

        const user = await getUserByEmail(email);

        if(!user){
            console.log("no user");
            return res.sendStatus(400);
        }

        const valid = await verifyPassword(user.password,password);

        if(!valid){
            return res.sendStatus(403);
        }

        user.sessionToken = createSessionToken(user.id.toString());
        console.log(user.sessionToken);
        await updateUserById(user.id,user);
        res.cookie('NEMANJA-AUTH', user.sessionToken, {domain: 'localhost', path: '/'});
        return res.status(200).json(user).end();


    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async(req:express.Request, res:express.Response) => {
    try {
        
        const{email, password, username,} = req.body;

        if(!email || !password || !username){
            console.log("missing inputs");
            return res.sendStatus(400);
        }

        const formatEmail = email.toString().toLowerCase();
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;


        if(!emailRegex.test(formatEmail)){
            return res.status(400).json({message: 'Wrong email format'});
        }

        const existingUser = await getUserByEmail(formatEmail);
        if(existingUser){
            console.log("User already exists");
            console.log(existingUser);
            return res.sendStatus(400);
        }

        const hashedPassword = await authentication(password);

        

        const user = createUser({
            email: formatEmail,
            username,
            password: hashedPassword
        })

        return res.status(200).json(user).end();


    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}