const router = require('express').Router();
const { userRegister, userLogin } = require('../controllers/authController');

router.post('/user-login', userLogin);
router.post('/user-register', userRegister);

module.exports = router;
