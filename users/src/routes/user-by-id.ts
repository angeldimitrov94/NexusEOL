import { NotFoundError, UserAttrs } from '@testsequencer/common';
import { User, createMongoObjectIdObject, currentUser, requireAdminUser, requireAuth, resourceBelongsToUsersAccount } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/users/:userid', [
    currentUser, 
    requireAuth, 
    requireAdminUser, 
    resourceBelongsToUsersAccount
], async (req: Request, res: Response) => {
    const userId = req.params.userid;

    const objectId = createMongoObjectIdObject(userId);
    if(objectId !== null) {
        const userDoc = await User.find({_id : objectId});
        let userAttr: UserAttrs|undefined = undefined;
        if(userDoc && userDoc.length > 0) {
            userAttr = {
                id: userDoc[0]?.id,
                email: userDoc[0]?.email,
                name: userDoc[0]?.name,
                level: userDoc[0]?.level,
                password: userDoc[0]?.password,
                accountId: userDoc[0]?.accountId
            };
    
            res.status(200).send(userAttr);
        }
        else {
            throw new NotFoundError();
        }
    }
    else {
        res.status(400).send({error: "Invalid user id"});
    }
});

export { router as userByIdRouter };