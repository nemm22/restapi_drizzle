import {  getUsersPosts,updatePost,deletePost,newPost } from "../controllers/posts";
import express from 'express';
import { isAuthenticated,isOwner,ownsPost } from "../middlewares";

export default(router: express.Router) => {
    router.get('/posts/:id', isAuthenticated,isOwner, getUsersPosts);
    router.post('/posts/', isAuthenticated, newPost);
    router.patch('/posts/', isAuthenticated, ownsPost, updatePost);
    router.delete('/posts/', isAuthenticated,ownsPost,deletePost);
}


