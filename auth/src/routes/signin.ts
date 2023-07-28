import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '@testsequencer/common';
import jwt from 'jsonwebtoken';
import { validateRequest } from '@testsequencer/common-backend/build/middlewares/validate-request';
import { User } from '@testsequencer/common-backend/build/models/user';
import { Password } from '@testsequencer/common-backend/build/services/password';

const router = express.Router();

router.post('/api/auth/signin', 
[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
], 
validateRequest,
async (req: Request, res: Response) => {
    let email = "";
    let password = "";
    email = req.body?.email;
    password = req.body?.password;

    const existingUser = await User.findOne({ email });
    if(!existingUser) {
        throw new BadRequestError(`Invalid credentials! User with email [${email}] does not exist.`);
    }    
    
    console.log(existingUser);
    console.log(password);

    const passwordsMatch = await Password.compare(existingUser.password, password);
    if(!passwordsMatch) {
        throw new BadRequestError('Invalid password!');
    }

    //Generate JWT
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email,
        level: existingUser.level,
        accountId: existingUser.accountId,
        exp: Math.floor(Date.now() / 1000) + (30 * 60) //expire after 30 minutes from issuance
    }, process.env.JWT_KEY!);
    //Store it on session object
    req.session = {
        jwt: userJwt
    };
    
    res.status(200).send(existingUser);
});

export { router as signinRouter };