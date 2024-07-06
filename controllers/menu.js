const menuValidator = require('../validators/menu')
const menuModel = require('./../models/menu')


module.exports.getAll = async (req, res) => {
    const menus = await menuModel.find().lean()

    menus.forEach(menu => {
        let subMenus = []
        if (!menu.parent) {
            for (let i=0; i<menus.length; i++) {
                if (menus[i].parent?.equals(menu._id)) {
                    subMenus.push(menus.splice(i, 1)[0])
                    i = i - 1
                }
            }
            menu.subMenus = subMenus
        }
    })
    res.status(200).json(menus)
}

module.exports.create = async (req, res) => {
    const isValidMenu = menuValidator(req.body)
    if (isValidMenu!==true) {
        return res.status(422).json(isValidMenu)
    }

    const { title, href, parent } = req.body
    const isExistHref = await menuModel.findOne({href})
    if (isExistHref) {
        return res.status(409).json({message: "There already is a menu with that href!!"})
    }

    const createdMenu = await menuModel.create({
        title,
        href,
        parent
    })
    res.status(201).json({message: "Menu created successfully :))", createdMenu})
}

module.exports.getAllForAdmin = async (req, res) => {
    const menus = await menuModel.find().lean()
    res.status(200).json(menus)
}

module.exports.updateMenu = async (req, res) => {
    const isValidMenu = menuValidator(req.body)
    if (isValidMenu!==true) {
        return res.status(422).json(isValidMenu)
    }

    const { title, href, parent } = req.body
    const isExistHref = await menuModel.findOne({
        _id: {$ne: req.params.id},
        href
    })
    if (isExistHref) {
        return res.status(409).json({message: "There already is a menu with that href!!"})
    }
    const updatedMenu = await menuModel.findByIdAndUpdate(req.params.id, {
        title,
        href,
        parent
    }, {
        new: true
    })
    if (!updatedMenu) {
        return res.status(404).json({message: "There is no menu with that id!!"})
    }

    res.status(203).json({message: "The menu updated successfully :))", updatedMenu})
}

module.exports.delete = async (req, res) => {
    const deletedMenu = await menuModel.findByIdAndDelete(req.params.id)
    if (!deletedMenu) {
        return res.status(404).json({message: "There is no menu with that id!!"})
    }
    res.status(200).json({mesage: "The menu deleted successfully :))", deletedMenu})
}