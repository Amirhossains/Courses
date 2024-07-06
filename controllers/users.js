const { isValidObjectId } = require('mongoose')
const banModel = require('./../models/ban-phone')
const userModel = require('./../models/user')
const bcrypt = require('bcrypt')

module.exports.banUser = async (req, res) => {
    const isValidId = isValidObjectId(req.params.id)
    if (isValidId === false) {
        return res.status(422).json({message: "The id is not valid :(("})
    }

    const mainUser = await userModel.findOne({_id: req.params.id}).lean()
    if (mainUser === null) {
        return res.status(404).json({message: "There is no user with that id :(("})
    }


    const isBanned = await banModel.findOne({phone: mainUser.phone}).lean()
    if (isBanned !== null) {
        return res.status(409).json({message: "The user is already banned!!"})
    }

    const banUser = await banModel.create({phone: mainUser.phone})
    if (banUser) {
        return res.status(201).json({ message: "The user baned successfully :))"})
    }
    return res.status(500).json({message: "Server Error!!"})
}

module.exports.getUsers = async (req, res) => {
    const userId = req.params.id
    if (!userId) {
        const users = await userModel.find({}).lean().select('-password -__v')
        return res.status(200).json({users})
    }

    const user = await userModel.findById(userId).lean().select('-password -__v')
    if (!user) {
        return res.status(404).json({message: "There is no user with that id :(("})
    }
    res.status(200).json(user)
}

module.exports.delUser = async (req, res) => {
    const userId = req.params.id
    const isValidId = isValidObjectId(userId)
    if (!isValidId) {
        return res.status(422).json({message: "The id is not valid :(("})
    }

    const user = await userModel.findByIdAndDelete(userId).lean().select('-password')
    if (!user) {
        return res.status(404).json({message: "There is no user with that id :(("})
    }
    res.status(200).json({message: "The user deleted successfully :))"})
}

module.exports.changeRole = async (req, res) => {
    const userId = req.params.id
    const isValidId = isValidObjectId(userId)
    if (!isValidId) {
        return res.status(422).json({message: "The id is not valid :(("})
    }

    const user = await userModel.findById(userId).lean().select('role')

    const newRole = user.role === "USER" ? "ADMIN" : "USER"

    const updatedUser = await userModel.findByIdAndUpdate(userId,
    {$set: {
        role: newRole
    }})
    
    if (!updatedUser) {
        return res.status(404).json({message: "There is no user with that id :(("})
    }
    res.status(200).json({message: "The user role changed successfully :))"})
}

module.exports.updateUser = async (req, res) => {
    const { name, username, email, password, phone } = req.body

    const hashedPassword = await bcrypt.hash(password, 12)

    const updatedUser = await userModel.findByIdAndUpdate(req.user._id, 
    {
        name,
        username,
        email,
        password: hashedPassword,
        phone
    }, {new: true}).select('-password').lean()
    // const userObject = updatedUser.toObject()
    // Reflect.deleteProperty(userObject, 'password')
    res.status(200).json({message: "The user updated successfully :))", updatedUser})
}