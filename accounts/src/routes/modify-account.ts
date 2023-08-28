import express, { Request, Response } from 'express';
import { AccountAttrs, NotAuthorizedError, UserRole } from '@testsequencer/common';
import { Account, createMongoObjectIdObject, currentUser, requireAuth, requireSuperAdminUser } from '@testsequencer/common-backend';

const router = express.Router();

router.patch('/api/accounts/:accountid/edit', [currentUser, requireAuth, requireSuperAdminUser], async (req: Request, res: Response) => {
    const accountid = req.params.accountid;

    const accountIdResult = await Account.count({ _id: createMongoObjectIdObject(accountid) });

    if(accountIdResult === 0) {
        console.log("Account not found");
        return res.status(404).send({ errors: [{ message: 'Account not found' }] });
    }

    const updatedAccount = req.body as AccountAttrs;

    const updatedAccountResult = await Account.updateOne({ _id: createMongoObjectIdObject(accountid) }, updatedAccount);
    
    if(updatedAccountResult && updatedAccountResult.modifiedCount === 0) {
        return res.status(304).send({ errors: [{ message: 'No changes made' }] });
    } else if (updatedAccountResult && updatedAccountResult.modifiedCount > 0) {
        return res.status(200).send(updatedAccountResult);
    } else {
        return res.status(500).send({ errors: [{ message: 'Something went wrong' }] });
    }
});

export { router as modifyAccountRouter };