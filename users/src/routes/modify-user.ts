import express, { Request, Response } from 'express';
import { NotAuthorizedError, UserAttrs, UserRole } from '@testsequencer/common';
import { createMongoObjectIdObject, currentUser, requireAdminUser, requireAuth, resourceBelongsToUsersAccount, User } from '@testsequencer/common-backend';

const router = express.Router();

router.patch('/api/users/:userid/edit', [
    currentUser, 
    requireAuth, 
    requireAdminUser
], async (req: Request, res: Response) => {
    console.log('Current user : ');
    console.log(req.currentUser);
    console.log(req.currentUser?.level === UserRole.SUPERADMIN);

    if(req.currentUser?.level !== UserRole.SUPERADMIN) {
        throw new NotAuthorizedError();
    } 

    const userid = req.params.userid;

    const updatedUser = req.body as UserAttrs;

    if(req.currentUser?.level === UserRole.SUPERADMIN || (req.currentUser?.level === UserRole.ADMIN && updatedUser.accountId === req.currentUser?.accountId)) {
        const userIdObject = createMongoObjectIdObject(userid);

        const updatedUserResult = await User.updateOne({ _id: userIdObject }, updatedUser);
        
        res.status(200).send(updatedUserResult);
    } else {
        res.status(401).send({error: "User does not belong to this user's account or user performing query is not admin or super-admin."});
    }
});

export { router as modifyUserRouter };