import express, {Request, Response} from 'express';
import { User } from '@testsequencer/common-backend/build/models/user';
import { Password, currentUser, requireAuth } from '@testsequencer/common-backend';

const router = express.Router();

router.post('/api/auth/resetpassword', async (req: Request, res: Response) => {
    const { email, currentPassword, newPassword } = req.body;

    if(!email || !currentPassword || !newPassword) {
        res.status(400).send({ error: 'Invalid request - null value(s) passed in!' });
    } else if (email.trim() === '' || currentPassword.trim() === '' || newPassword.trim() === '') {
        res.status(400).send({ error: 'Invalid request - empty values passed in!' });
    } else {
        const existingUser = await User.findOne({ email });

        if(!existingUser || !existingUser.password) {
            res.status(404).send({ error: 'No user with that email exists.' });
        } else {
            const currentPasswordsMatch = await Password.compare(existingUser?.password, currentPassword);
    
            if(!currentPasswordsMatch) {
                res.status(400).send({ error: 'Wrong current password!' });
            } else {

                try {
                    const hashedPassword = await Password.toHash(newPassword);
                    const user = await User.updateOne({ email }, { password: hashedPassword });

                    if(user.modifiedCount > 0) {
                        res.status(200).send();
                    } else { 
                        res.status(400).send({ error: `Password not updated - [${JSON.stringify(user)}]!` });
                    }
                } catch (error) {
                    res.status(400).send({ error: `Password not updated - ${error}!` });
                }
            }
        } 
    }
});

export { router as resetPasswordRouter };