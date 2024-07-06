const courseModel = require('./../models/course')

module.exports.searchByKeyword = async (req, res) => {
    const keyword = req.params.keyword.charAt(0).toUpperCase() + req.params.keyword.slice(1)
    const allCourses = await courseModel.find().lean()

    // console.log(allCourses[3].title.split(' ').includes(keyword))
    // const filteredCourses = allCourses.filter(course => {
    //     course.title.split(' ').includes('Django')
    // })
   
    const filteredCourses = []
    allCourses.forEach(course => {
        if (course.title.split(' ').includes(keyword)) {
            filteredCourses.push(course)
        }
    })
   
    if (filteredCourses.length === 0) {
        return res.status(404).json({message: "There is no course that included that keyword!!"})
    }
    res.status(200).json(filteredCourses)
}

module.exports.searchAnotherWay = async (req, res) => {
    const keyword = req.params.keyword
    const filteredCourses = await courseModel.find({
        title: {
            $regex: ".*" + keyword + ".*"
        }
    })
    if (filteredCourses.length === 0) {
        return res.status(404).json({message: "There is no course that included that keyword!!"})
    }
    res.status(200).json(filteredCourses)
}