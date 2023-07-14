import express, { Request, Response } from 'express';
import { NotAuthorizedError, TestResultAttrs, UserRole } from '@testsequencer/common';
import { currentUser, requireAuth, TestResult } from '@testsequencer/common-backend';

const router = express.Router();

router.patch('/api/testresults/:testresultid/edit', [requireAuth, currentUser], async (req: Request, res: Response) => {
    if(req.currentUser?.level === UserRole.TECHNICIAN) {
        throw new NotAuthorizedError();
    } 

    const testresultid = req.params.testresultid;

    try {
        const updatedTestResult = req.body as TestResultAttrs;

        if(req.currentUser?.accountId !== updatedTestResult.parentAccountId){
            return res.status(400).send({"error":"parentAccountId does not match user's account id"});
        }

        const updatedTestResultResult = await TestResult.updateOne({ __id: testresultid }, updatedTestResult);
        
        res.status(200).send(updatedTestResultResult);
    } catch (error) {
        res.status(500).send({"error":error});   
    }
});

export { router as modifyTestResultRouter };