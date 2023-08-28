import express, { Request, Response } from 'express';
import { NotAuthorizedError, UserRole } from '@testsequencer/common';
import { createMongoObjectIdObject, currentUser, requireAuth, Test } from '@testsequencer/common-backend';

const router = express.Router();

router.delete('/api/tests/:testid/delete', [currentUser, requireAuth], async (req: Request, res: Response) => {
    if(req.currentUser?.level !== UserRole.ADMIN && req.currentUser?.level !== UserRole.SUPERADMIN) {
        throw new NotAuthorizedError();
    } 

    const testid = req.params.testid;
    const mongodbObjectId = createMongoObjectIdObject(testid);

    if(!mongodbObjectId) {
        return res.status(400).send({"error":"testid is not valid mongodb object id"});
    }

    try {
        const count = await Test.count({ _id: mongodbObjectId });

        if(count === 0) {
            return res.status(404).send({"error":"test does not exist"});
        }
        
        const result = await Test.deleteOne({ _id: mongodbObjectId });
 
        if(!result.acknowledged) {
            throw new Error("test delete request was not acknowledged");
        } else if(result.acknowledged && result.deletedCount === 0) {
            throw new Error("test failed to be deleted");
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).send({"error":error});   
    }
});

export { router as deleteTestRouter };