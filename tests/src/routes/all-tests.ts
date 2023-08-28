import { TestAttrs } from '@testsequencer/common';
import { Test, currentUser, requireAuth } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/tests', [currentUser, requireAuth], async (req: Request, res: Response) => {
    let page = 0;
    let limit = 50;
    let pageString = req.query.page?.toString();
    if(pageString){
        let pageInt = parseInt(pageString);
        if(!isNaN(pageInt) && pageInt >= 0){
            page = pageInt;
        }
    }
    let limitString = req.query.limit?.toString();
    if(limitString) {
        let limitInt = parseInt(limitString);
        if(!isNaN(limitInt) && limitInt > 0){
            limit = limitInt;
        }
    }

    //TODO add paging
    const allTestDocs = await Test.find({parentAccountId: req.currentUser?.accountId}).sort({ _id: -1 }).skip(page*50).limit(limit);
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