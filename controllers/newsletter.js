const newsletterModel = require('./../models/newsletter')
const newsletterValidator = require('./../validators/newsletter')

module.exports.getAll = async (req, res) => {
    const newsletters = await newsletterModel.find().lean()
    res.status(200).json(newsletters)
}

module.exports.addEmail = async (req, res) => {
    const isValidEmail = newsletterValidator(req.body)
    if (isValidEmail!==true) {
        return res.status(422).json({message: "Unvalid email!!"})
    }

    const createdEmail = await newsletterModel.create({
        email: req.body.email
    })
    res.status(201).json({message: "The email added successfully :))", createdEmail})
}