const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerValidator = require('./../validators/register')
const banModel = require('./../models/ban-phone')
const userModel = require('./../models/user')


module.exports.register = async (req, res) => {
    const validationResult = registerValidator(req.body)

    if (validationResult === false) {
        return res.status(422).json(validationResult)
    }
    
    const { name, username, email, password, phone } = req.body
    const isUserExist = await userModel.findOne({
        $or: [{ username }, {email}]
    })
    if (isUserExist) {
        return res.status(409).json({message: "We already have a user with that username or email :(("})
    }

    const isBanned = await banModel.findOne({phone}).lean()
    if (isBanned !== null) {
        return res.status(403).json({message: "This phone number is banned!!"})
    }

    const userCount = (await userModel.find({}).lean()).length
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        name,
        username,
        email,
        password: hashedPassword,
        phone,
        role: userCount > 0 ? 'USER' : 'ADMIN'
    })

    const userObject = user.toObject()
    Reflect.deleteProperty(userObject, 'password')

    const accessToken = jwt.sign({id: user}, process.env.JWT_SECRET_KEY, 
    {expiresIn: '10 day'})

    res.status(201).json({
        message: "The user created successfully :)",
        user: userObject,
        token: accessToken
    })
}

module.exports.login = async (req, res) => {
    const { identifier, password } = req.body
    const foundUser = await userModel.findOne({
        $or: [{username: identifier}, {email: identifier}],
    })
    if (foundUser === null) {
        return res.status(422).json({message: "There is no user with that username or email :(("})
    }

    const isValidPassword = await bcrypt.compare(password, foundUser.password)
    if (!isValidPassword) {
        return res.status(401).json({message: "The password is incorrect :(("})
    }

    const accessToken = jwt.sign({ id: foundUser._id}, process.env.JWT_SECRET_KEY, 
    {expiresIn: '10 day'})
    res.status(200).json({message: "You loged in successfully :))", accessToken})
}

module.exports.getMe = async (req, res) => {
    
}
