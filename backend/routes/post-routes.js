const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post-controllers');
const likesCtrl = require('../controllers/likes-controllers');
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

router.post('/:id/likes', auth, multer, likesCtrl.likesPost);
router.post('/:id/dislikes', auth, multer, likesCtrl.dislikesPost);

module.exports = router;