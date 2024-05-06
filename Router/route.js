//import express
const express = require('express')

const loginController = require('../controller/loginController')
const employeeController = require('../controller/EmployeeController')
const multer=require('../middlewares/multerMiddleware')
const router = new express.Router() 

router.post('/login',loginController.login) 

router.post('/employee',multer.single('f_Image'),employeeController.addEmployee)

router.get('/employees',employeeController.getemployee)

router.put('/employee/:id',multer.single('f_Image'),employeeController.updateEmployee)

router.delete('/employee/:id',employeeController.deleteEmployee)

module.exports = router 