import express, { Request, Response } from 'express';
import { NotAuthorizedError, ProductAttrs, UserRole } from '@testsequencer/common';
import { currentUser, requireAuth, Product } from '@testsequencer/common-backend';

const router = express.Router();

router.patch('/api/products/:productid/edit', [currentUser, requireAuth], async (req: Request, res: Response) => {
    if(req.currentUser?.level === UserRole.TECHNICIAN) {
        throw new NotAuthorizedError();
    } 

    const productid = req.params.productid;

    const updatedProduct = req.body as ProductAttrs;

    if(req.currentUser?.accountId !== updatedProduct.parentAccountId){
        return res.status(400).send({"error":"parentAccountId does not match user's account id"});
    }

    const updatedProductResult = await Product.updateOne({ __id: productid }, updatedProduct);
    
    res.status(200).send(updatedProductResult);
});

export { router as modifyProductRouter };