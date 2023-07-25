import { NotFoundError, ProductAttrs } from '@testsequencer/common';
import { Product, createMongoObjectIdObject, currentUser, requireAuth } from '@testsequencer/common-backend';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/products/:productid', [currentUser, requireAuth], async (req: Request, res: Response) => {
    const productid = req.params.productid;
    const objectId = createMongoObjectIdObject(productid);
    if(objectId !== null) {
        const productDoc = await Product.find({_id : objectId});
        let productAttr: ProductAttrs|undefined = undefined;
        if(productDoc && productDoc.length > 0) {
            productAttr = {
                name: productDoc[0]?.name,
                description: productDoc[0]?.description,
                active: productDoc[0]?.active,
                mostRecentTestAttemptId: productDoc[0]?.mostRecentTestAttemptId,
                state: productDoc[0]?.state,
                tests: productDoc[0]?.tests,
                parentAccountId: productDoc[0]?.parentAccountId,
                id: productDoc[0]?.id
            };
    
            res.status(200).send(productAttr);
        }
        else {
            throw new NotFoundError();
        }
    }
    else {
        res.status(400).send({error: "Invalid product id"});
    }
});

export { router as productByIdRouter };