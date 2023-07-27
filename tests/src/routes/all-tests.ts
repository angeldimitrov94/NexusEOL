import { TestAttrs } from '@testsequencer/common';
import { Test, requireAuth } from '@testsequencer/common-backend';
import { currentUser } from '@testsequencer/common-backend/build/middlewares/current-user';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/tests', [currentUser, requireAuth], async (req: Request, res: Response) => {
    let page = 0;
    let limit = 50;
    let pageString = req.query.page;
    let limitString = req.query.limit;

    //TODO add paging
    const allTestDocs = await Test.find({parentAccountId: req.currentUser?.accountId});
    const allTestAttrs = allTestDocs.map(doc => { 
        const testAttr: TestAttrs = {
            name: doc.name,
            description: doc.description,
            active: doc.active,
            parentAccountId: doc.parentAccountId,
            id: doc.id,
            parentProductId: doc.parentProductId
        }
        return testAttr;
    });
    
    res.status(200).send(allTestAttrs);
});

export { router as allTestsRouter };