import { NotFoundError, TestResultAttrs } from '@testsequencer/common';
import { TestResult, createMongoObjectIdObject, requireAuth } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/testresults/:testresultid', requireAuth, async (req: Request, res: Response) => {
    const testresultid = req.params.testresultid;

    const objectId = createMongoObjectIdObject(testresultid);
    if(objectId !== null) {
        const testResultDoc = await TestResult.find({_id : objectId});
        let testResultAttr: TestResultAttrs|undefined = undefined;
        if(testResultDoc && testResultDoc.length > 0) {
            testResultAttr = {
                id: testResultDoc[0]?.id,
                parentAccountId: testResultDoc[0]?.parentAccountId,
                parentProductId: testResultDoc[0]?.parentProductId,
                parentTestAttemptId: testResultDoc[0]?.parentTestAttemptId,
                parentTestId: testResultDoc[0]?.parentTestId,
                results: testResultDoc[0]?.results
            };
    
            res.status(200).send(testResultAttr);
        }
        else {
            throw new NotFoundError();
        }
    }
    else {
        res.status(400).send({error: "Invalid test result id"});
    }
});

export { router as testResultByIdRouter };