const express = require('express');
const router = express.Router();
const { createComment, updateCommentContent, deleteComment, listComments } = require('./comments.controller');

async function comentar (req, res) {
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

router.post('/post', createComment);
router.get('/post', listComments);
router.delete('/post/:id',deleteComment);
router.patch('/post/:id',updateCommentContent );
module.exports = router;
