import express, { Request, Response } from 'express';
import { NotAuthorizedError, TestAttrs, UserRole } from '@testsequencer/common';
import { currentUser, requireAuth, Test } from '@testsequencer/common-backend';

const router = express.Router();

router.patch('/api/tests/:testid/edit', [currentUser, requireAuth], async (req: Request, res: Response) => {
    if(req.currentUser?.level === UserRole.TECHNICIAN) {
        throw new NotAuthorizedError();
    } 

    const testid = req.params.testid;

    try {
        const updatedTest = req.body as TestAttrs;

        if(req.currentUser?.accountId !== updatedTest.parentAccountId){
            return res.status(400).send({"error":"parentAccountId does not match user's account id"});
        }

        const updatedTestResult = await Test.updateOne({ id: testid }, updatedTest);
        
        res.status(200).send(updatedTestResult);
    } catch (error) {
        res.status(500).send({"error":error});   
    }
});

export { router as modifyTestRouter };