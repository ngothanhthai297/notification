
const router = require('express').Router()
const notificationRouter = require('./Notification')
const Notification = require('../models/Notification_Model');


router.use('/notification', notificationRouter)
module.exports = router