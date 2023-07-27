import { TestResultAttrs } from '@testsequencer/common';
import { TestResult, requireAuth } from '@testsequencer/common-backend';
import { currentUser } from '@testsequencer/common-backend/build/middlewares/current-user';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/testresults', [currentUser, requireAuth], async (req: Request, res: Response) => {
    let page = 0;
    let limit = 50;
    let pageString = req.query.page;
    let limitString = req.query.limit;

    //TODO add paging
    const allTestResultDocs = await TestResult.find({parentAccountId: req.currentUser?.accountId});
    const allTestResultAttrs = allTestResultDocs.map(doc => { 
        const testAttr: TestResultAttrs = {
            parentAccountId: doc.parentAccountId,
            id: doc.id,
            parentProductId: doc.parentProductId,
            parentTestAttemptId: doc.parentTestAttemptId,
            parentTestId: doc.parentTestId,
            results: doc.results
        }
        return testAttr;
    });
    
    res.status(200).send(allTestResultAttrs);
});

export { router as allTestResultsRouter };