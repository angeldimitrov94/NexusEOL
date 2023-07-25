import express, { Request, Response } from 'express';
import { AccountAttrs, NotAuthorizedError, UserRole } from '@testsequencer/common';
import { Account, currentUser, requireAuth } from '@testsequencer/common-backend';

const router = express.Router();

router.post('/api/accounts/create', [currentUser, requireAuth], async (req: Request, res: Response) => {   
    if(req.currentUser?.level !== UserRole.SUPERADMIN) {
        throw new NotAuthorizedError();
    }

    const newAccount = req.body as AccountAttrs;

    const existingAccount = await Account.findOne({ id: newAccount.id });
    if(existingAccount) {
        return res.status(400).send({"error":"Account already exists"});
    }

    const createdAccount = await Account.create(newAccount);
    
    res.status(201).send(createdAccount);
});

export { router as createAccountRouter };