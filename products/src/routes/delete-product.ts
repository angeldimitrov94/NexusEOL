import express, { Request, Response } from 'express';
import { NotAuthorizedError, UserRole } from '@testsequencer/common';
import { currentUser, requireAuth, Product, createMongoObjectIdObject } from '@testsequencer/common-backend';

const router = express.Router();

router.delete('/api/products/:productid/delete', [currentUser, requireAuth], async (req: Request, res: Response) => {
    if(req.currentUser?.level !== UserRole.ADMIN && req.currentUser?.level !== UserRole.SUPERADMIN) {
        throw new NotAuthorizedError();
    }

    const productid = req.params.productid;
    const mongodbObjectId = createMongoObjectIdObject(productid);

    if(!mongodbObjectId) {
        return res.status(400).send({"error":"productid is not valid mongodb object id"});
    }

    try {
        const count = await Product.count({ _id: mongodbObjectId });

        if(count === 0) {
            return res.status(404).send({"error":"product does not exist"});
        }

        const result = await Product.deleteOne({ _id: mongodbObjectId });
 
        if(!result.acknowledged) {
            throw new Error("product delete request was not acknowledged");
        } else if(result.acknowledged && result.deletedCount === 0) {
            throw new Error("product failed to be deleted");
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).send({"error":error});   
    }
});

export { router as deleteProductRouter };