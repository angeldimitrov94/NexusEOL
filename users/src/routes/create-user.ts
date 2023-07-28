import express, { Request, Response } from 'express';
import { UserAttrs } from '@testsequencer/common';
import { currentUser, requireAdminUser, requireAuth, User } from '@testsequencer/common-backend';

const router = express.Router();

router.post('/api/users/create', [
    currentUser, 
    requireAuth, 
    requireAdminUser
], async (req: Request, res: Response) => {
    const newUser = req.body as UserAttrs;

    const existingUser = await User.findOne({ email: newUser.email});
    if(existingUser) {
        return res.status(400).send({"error":"User with this email already exists"});
    }

    const createdUser = await User.create(newUser);
    createdUser.save();

    res.status(201).send(createdUser);
});

export { router as createUserRouter };