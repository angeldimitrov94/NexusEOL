import express, { Request, Response } from 'express';
import { NotAuthorizedError, ProductAttrs, UserRole } from '@testsequencer/common';
import { currentUser, requireAuth, Product } from '@testsequencer/common-backend';

const router = express.Router();

router.post('/api/products/create', [currentUser, requireAuth], async (req: Request, res: Response) => {
    if(req.currentUser?.level === UserRole.TECHNICIAN || req.currentUser?.level === UserRole.BIUSER) {
        throw new NotAuthorizedError();
    } 

    try {
        const newProduct = req.body as ProductAttrs;

        if(req.currentUser?.accountId !== newProduct.parentAccountId){
            return res.status(400).send({"error":"parentAccountId does not match user's account id"});
        }

        const existingProduct = await Product.findOne({ name: newProduct.name });
        if(existingProduct) {
            return res.status(400).send({"error":"Product already exists"});
        }

        const createdProduct = await Product.create(newProduct);
        createdProduct.save();

        const createdProductAttr:ProductAttrs = {
            name: createdProduct.name,
            description: createdProduct.description,
            active: createdProduct.active,
            state: createdProduct.state,
            tests: createdProduct.tests,
            parentAccountId: createdProduct.parentAccountId,
            id: createdProduct.id,
            mostRecentTestAttemptId: createdProduct?.mostRecentTestAttemptId
        };

        res.status(201).send(createdProductAttr);
    } catch (error) {
        res.status(500).send({"error":error});   
    }
});

export { router as createProductRouter };