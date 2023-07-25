import { currentUser } from '@testsequencer/common-backend/build/middlewares/current-user';
import express from 'express';

const router = express.Router();

router.get('/api/auth/signedin', currentUser, (req, res) => {   
    res.send({ signedIn: req.currentUser !== null && req.currentUser !== undefined });
});

export { router as signedInRouter };