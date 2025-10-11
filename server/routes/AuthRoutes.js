const express = require('express')
const { 
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    changePassword
} = require('../controllers/AuthController')
const authMiddleware = require('../middlewares/AuthMiddleware')
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:token',resetPassword);
router.put('/change-password', authMiddleware, changePassword);

module.exports = router;
