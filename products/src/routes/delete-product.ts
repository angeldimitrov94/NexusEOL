import express, { Request, Response } from 'express';
import { NotAuthorizedError, UserRole } from '@testsequencer/common';
import { currentUser, requireAuth, Product, createMongoObjectIdObject } from '@testsequencer/common-backend';

const router = express.Router();

router.delete('/api/products/:productid/delete', [currentUser, requireAuth], async (req: Request, res: Response) => {
    if(req.currentUser?.level !== UserRole.ADMIN && req.currentUser?.level !== UserRole.SUPERADMIN) {
        throw new NotAuthorizedError();
    }

    const productid = req.params.productid;

    try {
        await Product.deleteOne({ _id: createMongoObjectIdObject(productid) });
        
        res.status(204).send({});
    } catch (error) {
        res.status(500).send({"error":error});   
    }
});

export { router as deleteProductRouter };