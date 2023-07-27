import { AccountAttrs, NotFoundError } from '@testsequencer/common';
import { Account, createMongoObjectIdObject, currentUser, requireAuth, requireSuperAdminUser } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/accounts/:accountid', [currentUser, requireAuth, requireSuperAdminUser], async (req: Request, res: Response) => {
    const accountid = req.params.accountid;

    const objectId = createMongoObjectIdObject(accountid);
    if(objectId !== null) {
        const accountDoc = await Account.find({_id : objectId});
        let accountAttr: AccountAttrs|undefined = undefined;
        if(accountDoc && accountDoc.length > 0) {
            accountAttr = {
                name: accountDoc[0]?.name,
                active: accountDoc[0]?.active,
                products: accountDoc[0]?.products,
                id: accountDoc[0]?.id
            };
    
            res.status(200).send(accountAttr);
        }
        else {
            throw new NotFoundError();
        }
    }
    else {
        res.status(400).send({error: "Invalid account id"});
    }
});

export { router as accountByIdRouter };