import { TestResultAttrs } from '@testsequencer/common';
import { TestResult, requireAuth } from '@testsequencer/common-backend';
import { currentUser } from '@testsequencer/common-backend/build/middlewares/current-user';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/testattempts/:testattemptid/testresults', [currentUser, requireAuth], async (req: Request, res: Response) => {
    let page = 0;
    let limit = 50;
    let pageString = req.query.page;
    let limitString = req.query.limit;

    //TODO add paging
    const testattemptid = req.params?.testattemptid;
    const allTestResultDocs = await TestResult.find({parentAccountId: req.currentUser?.accountId, parentTestAttemptId: testattemptid});
    const allTestResultAttrs = allTestResultDocs.map(doc => { 
        const testResultAttr: TestResultAttrs = {
            parentAccountId: doc.parentAccountId,
            id: doc.id,
            parentProductId: doc.parentProductId,
            parentTestId: doc.parentTestId,
            results: doc.results,
            parentTestAttemptId: doc.parentTestAttemptId
        }
        return testResultAttr;
    });
    
    res.status(200).send(allTestResultAttrs);
});

export { router as allTestResultsOfTestAttemptIdRouter };