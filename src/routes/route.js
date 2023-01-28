const express = require("express");
const router = express.Router();
const userController=require('../controllers/userController')
const taskController=require('../controllers/taskController')
const auth=require('../middleware/auth')

router.get('/test-me', function (req, res) {
    res.json('My First ever api!')
});



router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)

router.get('/getTask',taskController.getTask)
router.post('/createTask',auth.Authentication,taskController.CreateTask)
router.put('/task/:task',auth.Authentication,taskController.UpdateTask)
router.delete('/task/:task',auth.Authentication,taskController.DeleteTask)






module.exports = router;