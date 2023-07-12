import { TestResult, requireAuth } from '@testsequencer/common-backend';
import { currentUser } from '@testsequencer/common-backend/build/middlewares/current-user';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('testresults', [currentUser, requireAuth], async (req: Request, res: Response) => {
    let page = 0;
    let limit = 50;
    let pageString = req.query.page;
    let limitString = req.query.limit;

    //TODO add paging
    const allTestResults = await TestResult.find({ parentAccountId: req.currentUser?.accountId });
    
    res.status(200).send(allTestResults);
});

export { router as allTestResultsRouter };