import express, { Request, Response } from 'express';
import { AccountAttrs, NotAuthorizedError, UserRole } from '@testsequencer/common';
import { Account, currentUser, requireAuth } from '@testsequencer/common-backend';

const router = express.Router();

router.patch('/api/accounts/:accountid/edit', [requireAuth, currentUser], async (req: Request, res: Response) => {
    if(req.currentUser?.level !== UserRole.SUPERADMIN) {
        throw new NotAuthorizedError();
    } 

    const accountid = req.params.accountid;

    const updatedAccount = req.body as AccountAttrs;

    const updatedAccountResult = await Account.updateOne({ id: accountid }, updatedAccount);
    
    res.status(200).send(updatedAccountResult);
});

export { router as modifyAccountRouter };