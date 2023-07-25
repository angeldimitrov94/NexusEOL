import { Test, requireAuth } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/tests/:testid', requireAuth, async (req: Request, res: Response) => {
    const testid = req.params.testid;

    //TODO add paging
    const test = await Test.find({id : testid, parentAccountId: req.currentUser?.accountId});
    
    res.status(200).send(test);
});

export { router as testByIdRouter };