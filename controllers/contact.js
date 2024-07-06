const contactModel = require('./../models/contact')
const contactValidator = require('./../validators/contact')
const nodemailer = require('nodemailer')

module.exports.getAll = async (req, res) => {
    const contactMessages = await contactModel.find().lean()
    res.status(200).json(contactMessages)
}

module.exports.addMessage = async (req, res) => {
    const isValidMessage = contactValidator(req.body)
    if (isValidMessage!==true) {
        return res.status(422).json(isValidMessage)
    }

    const {name, email, phone, answer, body} = req.body
    const createdMessage = await contactModel.create({
        name,
        email,
        phone,
        answer,
        body
    })
    res.status(201).json({message: "The message created successfully:))", createdMessage})
}

module.exports.deleteMessage = async (req, res) => {
    const deletedMessage = await contactModel.findByIdAndDelete(req.params.id).lean()
    if (!deletedMessage) {
        return res.status(404).json({message: "There is no message in contact with that id!!"})
    }
    res.status(203).json({message: "The contact message deleted successfully:))", deletedMessage})
}

module.exports.answerMessage = async (req, res) => {
    const isExistEmail = await contactModel.findOne({email: req.body.email})
    if (!isExistEmail) {
        return res.status(404).json({message: "There is no email with that entered email!!"})
    }
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'amhossainsh@gmail.com',
            pass: 'nfzb idom fbiz vetz'
        }
    })

    const mailOptions = {
        from: 'amhossainsh@gmail.com',
        to: req.body.email,
        subject: 'Test',
        text: req.body.answer
    }

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            return res.status(400).json({message: error})
        }
        await contactModel.findOneAndUpdate({
            email: req.body.email
        }, {
            $set: {
                answer: true
            }
        })
        res.status(200).json({message: "The email sent successfully :))", info})
    })
}