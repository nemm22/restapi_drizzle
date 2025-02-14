import express from 'express';
import { createTag, deleteTagById, getAllTags, gettagById, updateTagById } from '../models/tags';

export const getTag =  async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;

        if(!id){
            return res.status(400).json({message: 'No id'});
        }

        const tag = await gettagById(parseInt(id));

        if(!tag){
            return res.status(400).json({message: 'Error fetching tag'});
        }

        return res.status(200).json(tag);


    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const newTag = async (req: express.Request, res: express.Response) => {
    try {

        const {name} = req.body;

        if(!name){
            return res.status(400).json({message: 'Incorrect parameter input'});
        }

        const tag = await createTag({name:name});

        if(!name){
            return res.status(400).json({message: 'Error creating tag'});
        }

        return res.status(200).json(tag).end();

        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateTag = async( req: express.Request, res: express.Response) => {
    try {

        const {id} = req.params;
        const {name} = req.body;

        if(!id || !name){
            return res.status(400).json({message: 'Incorrect parameter input'});
        }

        const tag = await gettagById(parseInt(id));

        if(!tag){
            return res.status(400).json({message: 'Error fetching tag'});
        }

        tag.name = name;
        const updatedTag = await updateTagById(parseInt(id),tag);

        return res.status(200).json(updatedTag).end();
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteTag =  async(req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;

        if(!id ){
            return res.status(400).json({message: 'Incorrect parameter input'});
        }

        const deletedTag = await deleteTagById(parseInt(id));

        if(!deletedTag){
            return res.status(400).json({message: 'Error deleting tag'});
        }

        return res.status(200).json(deletedTag).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const showAllTags = async(req: express.Request, res: express.Response) => {
    try {
        const tags = await getAllTags();
        
        if(!tags){
            return res.status(400).json({message: 'Error fetching tags'});
        }

        return res.status(200).json(tags);
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}