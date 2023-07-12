import { currentUser } from '@testsequencer/common-backend/build/middlewares/current-user';
import express from 'express';

const router = express.Router();

router.get('/auth/currentuser', currentUser, (req, res) => {   
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };