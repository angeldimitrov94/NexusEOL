import { TestResult, requireAuth } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/testresults/:testresultid', requireAuth, async (req: Request, res: Response) => {
    const testresultid = req.params.testresultid;

    //TODO add paging
    const testResult = await TestResult.find({id : testresultid, parentAccountId: req.currentUser?.accountId});
    
    res.status(200).send(testResult);
});

export { router as testResultByIdRouter };