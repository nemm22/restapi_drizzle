import express from 'express';
import authentication from './authentication';
import users from './users';
import todos from './todos';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    todos(router);
    return(router);
}