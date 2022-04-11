const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post-controllers');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Functions recovery
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/myposts/:id', auth, postCtrl.getAllPost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;