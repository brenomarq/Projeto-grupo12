const express = require('express');
const router = express.Router();
const { listPosts,deletePost, updatePostContent } = require('./posts.controller');

router.get('/post', listPosts);
router.delete('/post/delete/:id',deletePost);
router.patch('/post/:id',updatePostContent );
module.exports = router;
