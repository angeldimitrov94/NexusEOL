import { requireAuth, currentUser, Account } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('accounts', [currentUser, requireAuth], async (req: Request, res: Response) => {
    let page = 0;
    let limit = 50;
    let pageString = req.query.page;
    let limitString = req.query.limit;

    //TODO add paging
    const allAccounts = await Account.find({});
    
    res.status(200).send(allAccounts);
});

export { router as allAccountsRouter };