import express, { Request, Response } from 'express';
import { NotAuthorizedError, UserAttrs, UserRole } from '@testsequencer/common';
import { currentUser, requireAuth, User } from '@testsequencer/common-backend';

const router = express.Router();

router.patch('/api/users/:userid/edit', [requireAuth, currentUser], async (req: Request, res: Response) => {
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

    const updatedUserResult = await User.updateOne({ __id: userid }, updatedUser);
    
    res.status(200).send(updatedUserResult);
});

export { router as modifyUserRouter };