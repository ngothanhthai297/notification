
const res = require('express/lib/response')
const { validationResult } = require('express-validator');
const Notification_Model = require('../models/Notification_Model')

exports.index = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let perPage = req.query.total || 5
    let page = req.query.page || 1
    Notification_Model.find({ address: req.body.address }, ['address', 'title', 'content', 'images'])
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, notifications) => {
            Notification_Model.countDocuments((err, count) => {
                if (err) return next(err)
                // res.send(notifications)
                res.status(200).json({
                    success: true,
                    message: 'Query Success.',
                    data: notifications
                });
            })
        })
}

exports.update = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    if (req.query.id && !req.body.address) {
        try {
            const checkExistId = await Notification_Model.find({ _id: req.query.id })
            Notification_Model.findOneAndUpdate({ id: req.query.id }, { $set: { status: req.body.status } }, (err, msg) => {
                if (err) {
                    res.status(500).json({
                        status: false,
                        message: 'Server Error. Please Try Again.'
                    });
                } else {
                    res.status(200).json({
                        status: true,
                        msg: "Update Status Success",
                    })
                }
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Id Wrong.'
            });
        }
       
    } else if (req.body.address && !req.query.id) {
        const checkExistAddress = await Notification_Model.find({ address: req.body.address })
        if (checkExistAddress != 0) {
            Notification_Model.updateMany({ address: req.body.address }, { $set: { status: req.body.status } }, (err, msg) => {
                if (err) {
                    res.status(500).json({
                        status: false,
                        message: 'Server error. Please try again.'
                    });
                } else {
                    res.status(200).json({
                        status: true,
                        msg: "Update Status Success",
                    })
                }
            })
        } else {
            res.status(401).json({
                status: false,
                msg: "Address Wrong",
            })
        }
    } else {
        res.status(200).json({
            status: false,
            msg: "Please Choose Update By Id Or Address",
        })
    }
    // Notification_Model.findByIdAndUpdate(req.body.id, { status: req.body.status }, (err,notification) =>{
    //     if(err){
    //         res.status(500).json({
    //             success: false,
    //             message: 'Server error. Please try again.'
    //             });
    //     }else{
    //         res.status(200).json({
    //             status : true,
    //             msg : "Update Status Success",
    //         })
    //     }
    // })   
}

exports.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address, title, content, type, images } = req.body
    const notification = await Notification_Model({
        address,
        title,
        content,
        type,
        images
    })
    await notification.save()

    res.json({
        status: 201,
        notification: notification,
    })

}
