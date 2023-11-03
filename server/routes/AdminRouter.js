const express = require('express')
const adminRoute = express();
const adminController = require('../Controller/adminController')

adminRoute.post('/login',adminController.adminLogin)
adminRoute.get('/userList',adminController.userList)
adminRoute.get('/editUser/:id',adminController.editUserDetails)

adminRoute.post('/updateUser',adminController.updateUserDetails)
adminRoute.post('/deleteUser',adminController.deleteUser)
adminRoute.post('/addUserData',adminController.addUserData)
module.exports = adminRoute