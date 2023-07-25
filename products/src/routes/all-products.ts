import { ProductAttrs } from '@testsequencer/common';
import { Product, requireAuth } from '@testsequencer/common-backend';
import { currentUser } from '@testsequencer/common-backend/build/middlewares/current-user';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/products', [currentUser, requireAuth], async (req: Request, res: Response) => {
    let page = 0;
    let limit = 50;
    let pageString = req.query.page;
    let limitString = req.query.limit;
    
    //TODO add paging
    const allProductDocs = await Product.find({parentAccountId: req.currentUser?.accountId});
    const allProductAttrs = allProductDocs.map(doc => { 
        const productAttr: ProductAttrs = {
            name: doc.name,
            description: doc.description,
            active: doc.active,
            mostRecentTestAttemptId: doc.mostRecentTestAttemptId,
            state: doc.state,
            tests: doc.tests,
            parentAccountId: doc.parentAccountId,
            id: doc.id
        }
        console.log(productAttr);
        return productAttr;
    });
    
    res.status(200).send(allProductAttrs);
});

export { router as allProductsRouter };