import { TestAttemptAttrs } from '@testsequencer/common';
import { TestAttempt, requireAuth } from '@testsequencer/common-backend';
import { currentUser } from '@testsequencer/common-backend/build/middlewares/current-user';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/testattempts', [currentUser, requireAuth], async (req: Request, res: Response) => {
    let page = 0;
    let limit = 50;
    let pageString = req.query.page;
    let limitString = req.query.limit;

    //TODO add paging
    const allTestAttemptDocs = await TestAttempt.find({parentAccountId: req.currentUser?.accountId});
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

export { router as allTestAttemptsRouter };