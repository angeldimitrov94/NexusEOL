import { UserAttrs } from '@testsequencer/common';
import { User, requireAuth, currentUser, requireSuperAdminUser } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/users', [currentUser, requireAuth, requireSuperAdminUser], async (req: Request, res: Response) => {
    let page = 0;
    let limit = 50;
    let pageString = req.query.page;
    let limitString = req.query.limit;

    //TODO add paging
    const allUserDocs = await User.find();
    const allUserAttrs = allUserDocs.map(doc => { 
        const userAttr: UserAttrs = {
            id: doc.id,
            name: doc.name,
            level: doc.level,
            password: doc.password,
            email: doc.email,
            accountId: doc.accountId
        }
        return userAttr;
    });
    
    res.status(200).send(allUserAttrs);
});

export { router as allUsersRouter };