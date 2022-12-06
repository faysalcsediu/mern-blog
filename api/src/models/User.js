import { Schema, model } from 'mongoose';

const User = model(
    'User',
    new Schema(
        {
            userName: {
                type: String,
                required: true,
                unique: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
            },
            avatar: {
                type: String,
                required: false,
            },
        },
        { timestamps: true }
    )
);

export default User;
