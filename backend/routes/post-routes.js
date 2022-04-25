const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post-controllers');
const commentCtrl = require('../controllers/comment-controllers');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Functions recovery
//Posts
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/allPosts/:id', auth, postCtrl.getAllPost);
router.get('/myPosts/:id', auth, postCtrl.getMyPost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;