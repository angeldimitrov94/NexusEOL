import { TestAttempt, currentUser, requireAuth } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/testattempts/:testattemptid', [requireAuth, currentUser], async (req: Request, res: Response) => {
    const testattemptid = req.params.testattemptid;

    //TODO add paging
    const testAttempt = await TestAttempt.find({__id : testattemptid, parentAccountId: req.currentUser?.accountId});
    
    res.status(200).send(testAttempt);
});

export { router as testAttemptByIdRouter };