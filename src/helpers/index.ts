import crypto from 'crypto';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const SECRET = 'NEMANJA-REST-API2';

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = async (password: string) => {
    return await argon2.hash(password);
}

export const verifyPassword = async (hashedPassword: string, password: string) => {
    return await argon2.verify(hashedPassword, password);
};

export const createSessionToken = (id: string) => {
    return jwt.sign({id}, SECRET, {expiresIn:'1h'});
}