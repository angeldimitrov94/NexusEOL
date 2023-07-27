import express, { Request, Response } from 'express';
import { NotAuthorizedError, ProductAttrs, UserRole } from '@testsequencer/common';
import { currentUser, requireAuth, Product } from '@testsequencer/common-backend';

const router = express.Router();

router.post('/api/products/create', [currentUser, requireAuth], async (req: Request, res: Response) => {
    if(req.currentUser?.level === UserRole.TECHNICIAN) {
        throw new NotAuthorizedError();
    } 

    console.log('req.body :');
    console.log(req.body);

    const newProduct = req.body as ProductAttrs;

    console.error(newProduct);

    if(req.currentUser?.accountId !== newProduct.parentAccountId){
        return res.status(400).send({"error":"parentAccountId does not match user's account id"});
    }

    try {
        const existingProduct = await Product.findOne({ name: newProduct.name });
        if(existingProduct) {
            return res.status(400).send({"error":"Product already exists"});
        }

        const createdProduct = await Product.create(newProduct);
        createdProduct.save();

        res.status(201).send(createdProduct);
    } catch (error) {
        res.status(500).send({"error":error});   
    }
});

export { router as createProductRouter };