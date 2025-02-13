import express from 'express';
import authentication from './authentication';
import users from './users';
import todos from './todos';
import posts from './posts';
import tags from './tags';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    todos(router);
    posts(router);
    tags(router);
    return(router);
}