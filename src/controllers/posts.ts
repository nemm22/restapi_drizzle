import express from 'express';
import { createPost, deletePostById, getPostbyId, getPostsByUserId, updatePostById } from '../models/posts';
import { getUserBySessionToken } from '../models/users';
import { deletePostTags, getPostByTagId, newPostTags } from '../models/post_tags';
import { date, timestamp } from 'drizzle-orm/mysql-core';


export const getPost = async(req: express.Request, res: express.Response) => {
    try {
        
        const {id} = req.params;

        const post = await getPostbyId(parseInt(id));

        if(!post){
            return res.status(404).json({message: 'No post with this id'});
        }

        return res.status(200).json(post);


    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getUsersPosts = async( req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;

        console.log(id);
        const posts = await getPostsByUserId(parseInt(id));

        if(!posts || posts.length === 0){
            return res.status(404).json({message: "No posts"});
        }

        return res.status(200).json(posts);
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getPostsByTag = async( req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        
        console.log(id);
        const ids = await getPostByTagId(parseInt(id));
        console.log(ids);
        
        const posts = await Promise.all(ids.map(({postId}) => getPostbyId(postId)));


        if(!posts || posts.length === 0){
            return res.status(404).json({message: "No posts"});
        }

        return res.status(200).json(posts);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const newPost = async(req: express.Request, res: express.Response) => {
    try {

        const {title, text,tagsIds}: { title: string; text: string; tagsIds: number[] } = req.body;
        const currentUser = await getUserBySessionToken(req.cookies['NEMANJA-AUTH']);
        const id = currentUser.id;

        if(!title || !text){
            return res.status(400).json({message: 'Incorrect parameter input'});
        }

        const post = await createPost({title:title, text: text, userId: id});
        if(!post){
            return res.status(400).json({message: 'Error creating post'});
        }
        console.log("post kreiran");

        const postId = post.id;

        if(tagsIds){
            tagsIds.map((tagId) => newPostTags({postId,tagId}));
        }


        return res.status(200).json(post).end();
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updatePost = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.body;
        const {text} = req.body;
        const post = await getPostbyId(id);
        if(!post){
            return res.status(400).json({message: 'Error fetching post'});
        }

        post.text = text;
        post.updatedAt = new Date();

        const updatedPost = await updatePostById(id,post);

        return res.status(200).json(updatedPost).end();


    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deletePost = async (req: express.Request, res: express.Response) => {
    try {
        
        const {id} = req.body;

        const post = await getPostbyId(id);
        if(!post){
            return res.status(400).json({message: 'Error fetching post'});
        }

        const deletedPost = await deletePostById(id);

        return res.status(200).json(deletedPost).end();


    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}












