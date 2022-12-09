import { Router } from 'express';
import { Post } from '../models/index.js';

const router = Router();

// CREATE POST
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE POST
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userName === req.body.userName) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            res.status(401).json('You can update only your post!');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE POST
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        try {
            if (post.userName === req.body.userName) {
                try {
                    await post.delete();
                    res.status(200).json('Post has been deleted...');
                } catch (error) {
                    res.status(500).json(error);
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET POST
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL POSTS
router.get('/', async (req, res) => {
    const userName = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (userName) {
            posts = await Post.find({ userName });
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
