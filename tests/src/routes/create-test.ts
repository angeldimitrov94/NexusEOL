import express, { Request, Response } from 'express';
import { NotAuthorizedError, TestAttrs, UserRole } from '@testsequencer/common';
import { currentUser, requireAuth, Test } from '@testsequencer/common-backend';

const router = express.Router();

router.post('/api/tests/create', [currentUser, requireAuth], async (req: Request, res: Response) => {
    if(req.currentUser?.level === UserRole.TECHNICIAN) {
        throw new NotAuthorizedError();
    } 

    const newTest = req.body as TestAttrs;

    if(req.currentUser?.accountId !== newTest.parentAccountId){
        return res.status(400).send({"error":"parentAccountId does not match user's account id"});
    }

    try {
        const existingTest = await Test.findOne({ id: newTest.id });
        if(existingTest) {
            return res.status(400).send({"error":"Test already exists"});
        }

        const createdTest = await Test.create(newTest);
        
        res.status(201).send(createdTest);
    } catch (error) {
        res.status(500).send({"error":error});   
    }
});

export { router as createTestRouter };