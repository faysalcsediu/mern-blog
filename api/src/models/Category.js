import { Schema, model } from 'mongoose';

const Category = model(
    'Category',
    new Schema(
        {
            name: {
                type: String,
                required: true,
                unique: true,
            },
        },
        { timestamps: true }
    )
);

export default Category;