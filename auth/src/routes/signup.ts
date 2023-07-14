import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadRequestError, UserRole } from '@testsequencer/common';
import { validateRequest } from '@testsequencer/common-backend/build/middlewares/validate-request';
import { User } from '@testsequencer/common-backend/build/models/user';

const router = express.Router();

router.post('/api/auth/signup', [
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 characters')
],
validateRequest, 
async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser) {
        throw new BadRequestError(`Email ${email} in use already`);     
    }

    const user = User.build({ email, password, name: email, level: UserRole.TECHNICIAN });
    await user.save();

    //Generate JWT
    const userJwt = jwt.sign({
        __id: user.__id,
        email: user.email,
        level: user.level,
        accountId: user.accountId
    }, process.env.JWT_KEY!);
    //Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
});

export { router as signupRouter };