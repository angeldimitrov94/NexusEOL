import express, { Request, Response } from 'express';
import { NotAuthorizedError, UserAttrs, UserRole } from '@testsequencer/common';
import { currentUser, requireAdminUser, requireAuth, resourceBelongsToUsersAccount, User } from '@testsequencer/common-backend';

const router = express.Router();

router.patch('/api/users/:userid/edit', [
    currentUser, 
    requireAuth, 
    requireAdminUser, 
    resourceBelongsToUsersAccount
], async (req: Request, res: Response) => {
    console.log('Current user : ');
    console.log(req.currentUser);
    console.log(req.currentUser?.level === UserRole.SUPERADMIN);

    if(req.currentUser?.level !== UserRole.SUPERADMIN) {
        throw new NotAuthorizedError();
    } 

    const userid = req.params.userid;

    const updatedUser = req.body as UserAttrs;

    console.log('updated user : ');
    console.log(updatedUser);

    const updatedUserResult = await User.updateOne({ id: userid }, updatedUser);
    
    res.status(200).send(updatedUserResult);
});

export { router as modifyUserRouter };