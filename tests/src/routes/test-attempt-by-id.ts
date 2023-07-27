import { NotFoundError, TestAttemptAttrs } from '@testsequencer/common';
import { TestAttempt, createMongoObjectIdObject, currentUser, requireAuth } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/testattempts/:testattemptid', [requireAuth, currentUser], async (req: Request, res: Response) => {
    const testattemptid = req.params.testattemptid;

    const objectId = createMongoObjectIdObject(testattemptid);
    if(objectId !== null) {
        const testAttemptDoc = await TestAttempt.find({_id : objectId});
        let testAttemptAttr: TestAttemptAttrs|undefined = undefined;
        if(testAttemptDoc && testAttemptDoc.length > 0) {
            testAttemptAttr = {
                id: testAttemptDoc[0]?.id,
                parentAccountId: testAttemptDoc[0]?.parentAccountId,
                parentTestId: testAttemptDoc[0]?.parentTestId,
                parentProductId: testAttemptDoc[0]?.parentProductId,
                dateTime: testAttemptDoc[0]?.dateTime,
                messages: testAttemptDoc[0]?.messages,
                state: testAttemptDoc[0]?.state,
                actions: testAttemptDoc[0]?.actions,
                currentActionIndex: testAttemptDoc[0]?.currentActionIndex,
                results: testAttemptDoc[0]?.results
            };
    
            res.status(200).send(testAttemptAttr);
        }
        else {
            throw new NotFoundError();
        }
    }
    else {
        res.status(400).send({error: "Invalid test attempt id"});
    }
});

export { router as testAttemptByIdRouter };