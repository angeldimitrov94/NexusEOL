import { User, requireAuth } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/users/:userid', requireAuth, async (req: Request, res: Response) => {
    const userId = req.params.userid;

    //TODO add paging
    const user = await User.find({__id : userId});
    
    res.status(200).send(user);
});

export { router as userByIdRouter };