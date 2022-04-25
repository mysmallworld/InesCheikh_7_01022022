const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment-controllers');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Comments
router.post('/', auth, multer, commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.getOneComment);
router.get('/allComments/:id', auth, commentCtrl.getAllComment);
router.get('/myComments/:id', auth, commentCtrl.getMyComment);
router.put('/:id', auth, commentCtrl.updateComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;