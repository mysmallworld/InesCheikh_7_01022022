const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user-controllers');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Functions recovery
router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', auth, userCtrl.getUser);
router.put('/:id', auth, multer, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

//Export router from user.js file
module.exports = router;