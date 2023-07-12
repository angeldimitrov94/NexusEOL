import { TestAttempt, requireAuth } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/tests/:testid/testattempts', requireAuth, async (req: Request, res: Response) => {
    const testid = req.params.testid;

    //TODO add paging
    const testAttempt = await TestAttempt.find({ parentTestId : testid, parentAccountId: req.currentUser?.accountId });
    
    res.status(200).send(testAttempt);
});

export { router as allTestAttemptsOfTestIdRouter };