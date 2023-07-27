import { AccountAttrs } from '@testsequencer/common';
import { requireAuth, currentUser, Account, requireSuperAdminUser } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/accounts', [currentUser, requireAuth, requireSuperAdminUser], async (req: Request, res: Response) => {
    let page = 0;
    let limit = 50;
    let pageString = req.query.page;
    let limitString = req.query.limit;

    //TODO add paging
    const allAccountDocs = await Account.find({_id: req.currentUser?.accountId});
    const allAccountAttrs = allAccountDocs.map(doc => { 
        const accountAttr: AccountAttrs = {
            name: doc.name,
            active: doc.active,
            id: doc.id,
            products: doc.products
        }
        return accountAttr;
    });
    
    res.status(200).send(allAccountAttrs);
});

export { router as allAccountsRouter };