const notificationRouter = require('express').Router()
const notificationController = require('../controllers/Notification')
const { body } = require('express-validator');
//Get list by address 
notificationRouter.post('/',[
    body('address',"Address is required").not().isEmpty(),
],notificationController.index)
//Add notification
notificationRouter.post('/create',
[
    body('address','Address is required').not().isEmpty(),
    body('title','Title is required').not().isEmpty(),
    body('content','Content is required').not().isEmpty(),
    body('type','Type is required').not().isEmpty(),
    body('images','Images is required').not().isEmpty(),
], notificationController.create)
// Update status notification
notificationRouter.post('/update',[
    body('status','Status is required').not().isEmpty()
], notificationController.update)



module.exports = notificationRouter
