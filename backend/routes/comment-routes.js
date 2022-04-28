const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment-controllers');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Comments
router.post('/', auth, multer, commentCtrl.createComment);
router.put('/:id', auth, multer, commentCtrl.updateComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;