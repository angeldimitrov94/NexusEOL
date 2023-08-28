import { currentUser } from '@testsequencer/common-backend/build/middlewares/current-user';
import express from 'express';

const router = express.Router();

router.get('/api/auth/signedin', currentUser, (req, res) => {   
    res.status(200).send();
});

export { router as signedInRouter };