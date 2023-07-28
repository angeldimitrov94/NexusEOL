import express, { Request, Response } from 'express';
import { NotAuthorizedError, TestAttemptAttrs, UserRole } from '@testsequencer/common';
import { currentUser, requireAuth, TestAttempt } from '@testsequencer/common-backend';

const router = express.Router();

router.post('/api/testattempts/create', [currentUser, requireAuth], async (req: Request, res: Response) => {
    if(req.currentUser?.level === UserRole.TECHNICIAN) {
        throw new NotAuthorizedError();
    } 

    const newTestAttempt = req.body as TestAttemptAttrs;

    if(req.currentUser?.accountId !== newTestAttempt.parentAccountId){
        return res.status(400).send({"error":"parentAccountId does not match user's account id"});
    }

    try {
        const createdTestAttempt = await TestAttempt.create(newTestAttempt);
        createdTestAttempt.save();

        res.status(201).send(createdTestAttempt);
    } catch (error) {
        res.status(500).send({"error":error});   
    }
});

export { router as createTestAttemptRouter };