import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {
    authRoute,
    userRoute,
    postsRoute,
    categoryRoute,
} from './src/routes/index.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log('Database connection established😊'))
    .catch((error) => console.log(error));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/posts/', postsRoute);
app.use('/api/category/', categoryRoute);

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});
