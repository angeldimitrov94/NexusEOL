import express, { Request, Response } from 'express';
import { currentUser, requireAuth, resourceBelongsToUsersAccount, requireAdminUser, User, createMongoObjectIdObject } from '@testsequencer/common-backend';

const router = express.Router();

router.delete('/api/users/:userid/delete', 
[
    currentUser, 
    requireAuth, 
    requireAdminUser, 
    resourceBelongsToUsersAccount
], async (req: Request, res: Response) => {
    const userid = req.params.userid;

    try {
        await User.deleteOne({ _id: createMongoObjectIdObject(userid) });
        
        res.status(204).send({});
    } catch (error) {
        res.status(500).send({"error":error});   
    }
});

export { router as deleteUserRouter };