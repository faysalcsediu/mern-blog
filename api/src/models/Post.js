import { Schema, model } from 'mongoose';

const Post = model(
    'Post',
    new Schema(
        {
            title: {
                type: String,
                required: true,
                unique: true,
            },
            desc: {
                type: String,
                required: true,
            },
            photo: {
                type: String,
                required: false,
            },
            userName: {
                type: String,
                required: true,
            },
            categories: {
                type: Array,
                required: false,
            },
        },
        { timestamps: true }
    )
);

export default Post;
