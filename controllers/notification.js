const { isValidObjectId } = require("mongoose")
const userModel = require("../models/user")
const notificationModel = require("./../models/notification")

module.exports.sendNotif = async (req, res) => {
    const {message, adminId} = req.body
    const isValidId = isValidObjectId(adminId)
    if (!isValidId) {
        return res.sttus(422).json({message: "The id is not valid!!"})
    }

    const isExistAdmin = await userModel.findById(adminId).lean()
    if (!isExistAdmin) {
        return res.status(404).json({message: "There is no admin with that id!!"})
    }

    const createdNotification = await notificationModel.create({
        message,
        adminId
    })
    res.status(201).json({message: "Notification sent successfully :))", createdNotification})
}

module.exports.getAll = async (req, res) => {
    const notifications = await notificationModel.find().lean()
    res.status(200).json(notifications)
}

module.exports.deleteNotif = async (req, res) => {
    const deletedNotification = await notificationModel.findByIdAndDelete(req.params.id).lean()
    if (!deletedNotification) {
        return res.status(404).json({message: "There is no notification with that id!!"})
    }
    res.status(200).json({message: "The notification deleted successfully :))", deletedNotification})
}

module.exports.allNotif = async (req, res) => {
    const notifications = await notificationModel.find({adminId: req.user._id}).lean()
    if (notifications.length < 1) {
        return res.status(200).json({message: "You have no notifications"})
    }
    return res.status(200).json(notifications)
}

module.exports.seeNotif = async (req, res) => {
    const notification = await notificationModel.findOneAndUpdate({
        adminId: req.user._id,
        _id: req.params.id
    }, {
        seen: 1
    }, {new: true}).lean()
    if (!notification) {
        return res.status(422).json({message: "There is no notification with that id!!"})
    }
    return res.status(203).json(notification)
}
