import express, { Request, Response } from 'express';
import { NotAuthorizedError, TestAttemptAttrs, TestAttrs, UserRole } from '@testsequencer/common';
import { currentUser, requireAuth, Test, TestAttempt } from '@testsequencer/common-backend';

const router = express.Router();

router.patch('/api/testattempts/:testattemptid/edit', [requireAuth, currentUser], async (req: Request, res: Response) => {
    if(req.currentUser?.level === UserRole.TECHNICIAN) {
        throw new NotAuthorizedError();
    } 

    const testattemptid = req.params.testattemptid;

    try {
        const updatedTestAttempt = req.body as TestAttemptAttrs;

        if(req.currentUser?.accountId !== updatedTestAttempt.parentAccountId){
            return res.status(400).send({"error":"parentAccountId does not match user's account id"});
        }

        const updatedTestAttemptResult = await TestAttempt.updateOne({ __id: testattemptid }, updatedTestAttempt);
        
        res.status(200).send(updatedTestAttemptResult);
    } catch (error) {
        res.status(500).send({"error":error});   
    }
});

export { router as modifyTestAttemptRouter };