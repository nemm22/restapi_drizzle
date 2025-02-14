import {  getUsersPosts,updatePost,deletePost,newPost, getPostsByTag } from "../controllers/posts";
import express from 'express';
import { isAuthenticated,isOwner,ownsPost } from "../middlewares";

export default(router: express.Router) => {
    router.get('/posts/tag/:id', isAuthenticated, getPostsByTag);
    router.get('/posts/', isAuthenticated, getUsersPosts);
    router.post('/posts/', isAuthenticated, newPost);
    router.patch('/posts/', isAuthenticated, ownsPost, updatePost);
    router.delete('/posts/', isAuthenticated,ownsPost,deletePost);
}


