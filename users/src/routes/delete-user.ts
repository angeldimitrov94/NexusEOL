import express, { Request, Response } from 'express';
import { currentUser, requireAuth, resourceBelongsToUsersAccount, requireAdminUser, User, createMongoObjectIdObject } from '@testsequencer/common-backend';
import { UserRole } from '@testsequencer/common';

const router = express.Router();

router.delete('/api/users/:userid/delete', 
[
    currentUser, 
    requireAuth, 
    requireAdminUser
], async (req: Request, res: Response) => {
    const userid = req.params.userid;   
    try {
        const userIdObject = createMongoObjectIdObject(userid);
        const userToDelete = await User.findOne({_id : userIdObject});

        if(req.currentUser?.level === UserRole.SUPERADMIN || 
            (req.currentUser?.level === UserRole.ADMIN && 
                userToDelete && 
                userToDelete.accountId === req.currentUser?.accountId)) {
    
            const deletedUserResult = await User.deleteOne({ _id: userIdObject });
            
            res.status(200).send(deletedUserResult);
        } else {
            res.status(401).send({error: "User does not belong to this user's account or user performing query is not admin or super-admin."});
        }
    } catch (error) {
        res.status(500).send({"error":error});   
    }
});

export { router as deleteUserRouter };