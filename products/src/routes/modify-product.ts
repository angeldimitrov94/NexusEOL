import express, { Request, Response } from 'express';
import { NotAuthorizedError, ProductAttrs, UserRole } from '@testsequencer/common';
import { currentUser, requireAuth, Product, createMongoObjectIdObject } from '@testsequencer/common-backend';

const router = express.Router();

router.patch('/api/products/:productid/edit', [currentUser, requireAuth], async (req: Request, res: Response) => {
    if(req.currentUser?.level === UserRole.TECHNICIAN || req.currentUser?.level === UserRole.BIUSER) {
        throw new NotAuthorizedError();
    } 

    const productid = req.params.productid;

    if(createMongoObjectIdObject(productid) === null) {
        return res.status(400).send({"error":"productid is not valid mongodb object id"});
    }

    const updatedProduct = req.body as ProductAttrs;

    if(req.currentUser?.accountId !== updatedProduct.parentAccountId){
        return res.status(400).send({"error":"parentAccountId does not match user's account id"});
    }

    const updatedProductResult = await Product.updateOne({ _id: productid }, updatedProduct);

    if(updatedProductResult.modifiedCount > 0) {
        const updatedProduct = await Product.findById(productid);

        if(!updatedProduct) {
            return res.status(500).send({"error":"modified product not found"});
        } 

        const updateProductAttr: ProductAttrs = {
            name: updatedProduct.name,
            description: updatedProduct.description,
            active: updatedProduct.active,
            state: updatedProduct.state,
            tests: updatedProduct.tests,
            parentAccountId: updatedProduct.parentAccountId,
            id: updatedProduct.id,
            mostRecentTestAttemptId: updatedProduct.mostRecentTestAttemptId
        };
        return res.status(200).send(updateProductAttr);
    } else {
        return res.status(304).send();
    }
});

export { router as modifyProductRouter };