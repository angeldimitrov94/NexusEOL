import { NotFoundError, TestAttrs } from '@testsequencer/common';
import { Test, createMongoObjectIdObject, currentUser, requireAuth } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/tests/:testid', [currentUser, requireAuth], async (req: Request, res: Response) => {
    const testid = req.params.testid;

    const objectId = createMongoObjectIdObject(testid);
    if(objectId !== null) {
        const testDoc = await Test.find({_id : objectId});
        let testAttr: TestAttrs|undefined = undefined;        

        if(testDoc && testDoc.length > 0) {
            testAttr = {
                id: testDoc[0]?.id,
                parentAccountId: testDoc[0]?.parentAccountId,
                parentProductId: testDoc[0]?.parentProductId,
                name: testDoc[0]?.name,
                description: testDoc[0]?.description,
                active: testDoc[0]?.active
            };
    
            res.status(200).send(testAttr);
        }
        else {
            throw new NotFoundError();
        }
    }
    else {
        res.status(400).send({error: "Invalid test id"});
    }
});

export { router as testByIdRouter };