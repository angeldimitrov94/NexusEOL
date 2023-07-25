import { Account, requireAuth } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/accounts/:accountid', requireAuth, async (req: Request, res: Response) => {
    const accountid = req.params.accountid;

    //TODO add paging
    const account = await Account.find({id : accountid});
    
    res.status(200).send(account);
});

export { router as accountByIdRouter };