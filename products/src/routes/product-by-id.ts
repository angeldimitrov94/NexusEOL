import { Product, currentUser, requireAuth } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/products/:productid', [currentUser, requireAuth], async (req: Request, res: Response) => {
    const productid = req.params.productid;

    //TODO add paging
    const product = await Product.find({__id : productid, parentAccountId: req.currentUser?.accountId});
    
    res.status(200).send(product);
});

export { router as productByIdRouter };