const express = require('express')
const userRoute = express();
const userController = require('../Controller/userController');
const {uploadOptions} = require('../Configuration/multer')

userRoute.post('/signup',userController.userRegistaion);
userRoute.post('/login',userController.userLogin)
userRoute.post('/profileImage',uploadOptions.single('image'),userController.addProfileImage)

module.exports = userRoute