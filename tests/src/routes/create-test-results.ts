import express, { Request, Response } from 'express';
import { NotAuthorizedError, TestResultAttrs, UserRole } from '@testsequencer/common';
import { currentUser, requireAuth, TestResult } from '@testsequencer/common-backend';

const router = express.Router();

router.post('/testresults/create', [currentUser, requireAuth], async (req: Request, res: Response) => {
    if(req.currentUser?.level === UserRole.TECHNICIAN) {
        throw new NotAuthorizedError();
    } 

    const newTestResult = req.body as TestResultAttrs;

    if(req.currentUser?.accountId !== newTestResult.parentAccountId){
        return res.status(400).send({"error":"parentAccountId does not match user's account id"});
    }

    try {
        const existingTestResult = await TestResult.findOne({ __id: newTestResult.__id });
        if(existingTestResult) {
            return res.status(400).send({"error":"Test result already exists"});
        }

        const createdTestResult = await TestResult.create(newTestResult);
        
        res.status(201).send(createdTestResult);
    } catch (error) {
        res.status(500).send({"error":error});   
    }
});

export { router as createTestResultRouter };