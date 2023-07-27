import { TestAttemptAttrs } from '@testsequencer/common';
import { TestAttempt, requireAuth } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/tests/:testid/testattempts', requireAuth, async (req: Request, res: Response) => {
    const testid = req.params.testid;

    //TODO add paging
    const allTestAttemptDocs = await TestAttempt.find({parentAccountId: req.currentUser?.accountId, parentTestId: testid});
    const allTestAttemptAttrs = allTestAttemptDocs.map(doc => { 
        const testAttemptAttr: TestAttemptAttrs = {
            parentAccountId: doc.parentAccountId,
            id: doc.id,
            parentProductId: doc.parentProductId,
            parentTestId: doc.parentTestId,
            results: doc.results,
            dateTime: doc.dateTime,
            messages: doc.messages,
            state: doc.state,
            actions: doc.actions,
            currentActionIndex: doc.currentActionIndex
        }
        return testAttemptAttr;
    });
    
    res.status(200).send(allTestAttemptAttrs);
});

export { router as allTestAttemptsOfTestIdRouter };