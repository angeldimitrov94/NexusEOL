import express, { Request, Response } from 'express';
import { NotAuthorizedError, UserAttrs, UserRole } from '@testsequencer/common';
import { currentUser, requireAuth, User } from '@testsequencer/common-backend';

const router = express.Router();

router.post('/users/create', [currentUser, requireAuth], async (req: Request, res: Response) => {
    console.log(req.currentUser);
    
    if(req.currentUser?.level !== UserRole.SUPERADMIN) {
        throw new NotAuthorizedError();
    } 

    const newUser = req.body as UserAttrs;

    const existingUser = await User.findOne({ __id: newUser.__id });
    if(existingUser) {
        return res.status(400).send({"error":"User already exists"});
    }

    const createdUser = await User.create(newUser);
    
    res.status(201).send(createdUser);
});

export { router as createUserRouter };