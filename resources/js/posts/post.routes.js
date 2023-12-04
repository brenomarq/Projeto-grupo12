const express = require('express');
const router = express.Router();
const { createPost, listPosts,deletePost, updatePostContent } = require('./posts.controller');

async function postar (req, res) {
try {
    const response = await fetch('http://localhost:3000/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
}
catch(error){
    res.status(401).json({ message: error.message });

}
};

router.post('/post', createPost);
router.get('/post', listPosts);
router.delete('/post/:id',deletePost);
router.patch('/post/:id',updatePostContent );
module.exports = router;
