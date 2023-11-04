// Importing Modules
const express = require('express');
const router = express.Router();


const { userRegisterValidator,userLoginValidator} = require('../middleware/UserMiddleware');
const Signup = require('../controller/Signup');
const Login = require('../controller/Login');
const { verifyToken } = require('../middleware/AuthenticationMiddleware');
const GetUser = require('../controller/GetUser');
const Logout = require('../controller/Logout');
const AddBoard = require('../controller/AddBoard');
const GetBoards = require('../controller/GetBoards');
const DeleteBoard = require('../controller/DeleteBoard');
const AddTask = require('../controller/AddTask');
const GetTasks = require('../controller/GetTasks');
const DeleteTask = require('../controller/DeleteTask');
const TaskBoardUpdate = require('../controller/TaskBoardUpdate');


// APIs Route
router.get('/', (_,res) => {res.send('Hey, Welcome to Task Board');});
router.post('/signup',userRegisterValidator, Signup);
router.post('/login', userLoginValidator, Login);
router.get('/getUser', verifyToken, GetUser);
router.post('/logout', verifyToken, Logout);

router.post('/addBoard', verifyToken, AddBoard);
router.post('/getBoards', verifyToken, GetBoards);
router.delete('/deleteBoard', verifyToken, DeleteBoard);

router.post('/addTask', verifyToken, AddTask);
router.post('/getTasks', verifyToken, GetTasks);
router.delete('/deleteTasks', verifyToken, DeleteTask);
router.put('/taskBoardUpdate', verifyToken, TaskBoardUpdate);

module.exports = router;