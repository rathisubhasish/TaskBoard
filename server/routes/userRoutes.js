// Importing Modules
const express = require('express');
const router = express.Router();


const { userRegisterValidator,userLoginValidator} = require('../middleware/UserMiddleware');
const Signup = require('../controller/Signup');
const Login = require('../controller/Login');
const { verifyToken } = require('../middleware/AuthenticationMiddleware');
const GetUser = require('../controller/GetUser');
const Logout = require('../controller/Logout');


// APIs Route
router.get('/', (_,res) => {res.send('Hey, Welcome to Task Board');});
router.post('/signup',userRegisterValidator, Signup);
router.post('/login', userLoginValidator, Login);
router.get('/getUser', verifyToken, GetUser);
router.post('/logout', verifyToken, Logout);

module.exports = router;