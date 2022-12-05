import { Router } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/index.js';

const router = Router();

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPass,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });
        !user && res.status(400).json('Wrong Credentials😥');

        const passValidation = await bcrypt.compare(
            req.body.password,
            user.password
        );
        !passValidation && res.status(400).json('Wrong Credentials😥');

        const {password, email, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
