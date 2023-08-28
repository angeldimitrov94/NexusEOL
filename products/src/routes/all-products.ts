import { ProductAttrs } from '@testsequencer/common';
import { Product, requireAuth, resourceBelongsToUsersAccount } from '@testsequencer/common-backend';
import { currentUser } from '@testsequencer/common-backend/build/middlewares/current-user';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/products', [currentUser, requireAuth], async (req: Request, res: Response) => {
    let page = 0;
    let limit = 50;
    let pageString = req.query.page?.toString();
    if(pageString){
        let pageInt = parseInt(pageString);
        if(!isNaN(pageInt) && pageInt >= 0){
            page = pageInt;
        }
    }
    let limitString = req.query.limit?.toString();
    if(limitString) {
        let limitInt = parseInt(limitString);
        if(!isNaN(limitInt) && limitInt > 0){
            limit = limitInt;
        }
    }
    
    //TODO add paging
    const allProductDocs = await Product.find({parentAccountId: req.currentUser?.accountId}).sort({ _id: -1 }).skip(page*50).limit(limit);
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
        return productAttr;
    });
    
    res.status(200).send(allProductAttrs);
});

export { router as allProductsRouter };