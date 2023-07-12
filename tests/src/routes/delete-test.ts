import express, { Request, Response } from 'express';
import { NotAuthorizedError, UserRole } from '@testsequencer/common';
import { currentUser, requireAuth, Test } from '@testsequencer/common-backend';

const router = express.Router();

router.delete('/tests/:testid/delete', [currentUser, requireAuth], async (req: Request, res: Response) => {
    if(req.currentUser?.level !== UserRole.ADMIN && req.currentUser?.level !== UserRole.SUPERADMIN) {
        throw new NotAuthorizedError();
    } 

    const testid = req.params.testid;

    try {
        await Test.deleteOne({ __id: testid });
        
        res.status(204);
    } catch (error) {
        res.status(500).send({"error":error});   
    }
});

export { router as deleteTestRouter };