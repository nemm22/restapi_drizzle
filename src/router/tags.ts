import { getTag, newTag, updateTag, deleteTag} from 'controllers/tags';
import express from 'express';
import { isAuthenticated,isOwner,ownsPost } from "../middlewares";


export default(router: express.Router) => {
    router.get('/tags/:id', isAuthenticated, getTag);
    router.post('/tags/', isAuthenticated, newTag);
    router.patch('/tags/:id', isAuthenticated, updateTag);
    router.delete('/tags/:id', isAuthenticated, deleteTag);
}


