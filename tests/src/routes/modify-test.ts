import express, { Request, Response } from 'express';
import { NotAuthorizedError, TestAttrs, UserRole } from '@testsequencer/common';
import { createMongoObjectIdObject, currentUser, requireAuth, Test } from '@testsequencer/common-backend';

const router = express.Router();

router.patch('/api/tests/:testid/edit', [currentUser, requireAuth], async (req: Request, res: Response) => {
    if(req.currentUser?.level === UserRole.TECHNICIAN || req.currentUser?.level === UserRole.BIUSER) {
        throw new NotAuthorizedError();
    } 

    const testid = req.params.testid;

    if(createMongoObjectIdObject(testid) === null) {
        return res.status(400).send({"error":"testid is not valid mongodb object id"});
    }

    try {
        const updatedTest = req.body as TestAttrs;

        if(req.currentUser?.accountId !== updatedTest.parentAccountId){
            return res.status(400).send({"error":"parentAccountId does not match user's account id"});
        }

        const updatedTestResult = await Test.updateOne({ _id: testid }, updatedTest);
        
        if(!updatedTestResult.acknowledged) {
            throw new Error("update not acknowledged");
        } else if (updatedTestResult.modifiedCount > 0) {
            const updatedTest = await Test.findById(testid);
    
            if(!updatedTest) {
                return res.status(500).send({"error":"modified test not found"});
            } 
    
            const updatedTestAttr: TestAttrs = {
                name: updatedTest.name,
                description: updatedTest.description,
                active: updatedTest.active,
                parentProductId: updatedTest.parentProductId,
                parentAccountId: updatedTest.parentAccountId,
                id: updatedTest.id,
            };
            return res.status(200).send(updatedTestAttr);
        } else {
            return res.status(304).send();
        }
    } catch (error) {
        res.status(500).send({"error":error});   
    }
});

export { router as modifyTestRouter };