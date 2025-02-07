const { StatusCodes } = require("http-status-codes");
const articlesServices = require("../services/articles")

const getAllArticle = async (req, res, next) => {
    try {
        const article = await articlesServices.getAllArticle()
        return res.status(StatusCodes.OK).json({status : 200, message : "Xử lý thành công", content : article})
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const createArticle = async (req ,res, next) => {
    try {
        const {title,content,userId,categoryId,image} = req.body
        const fileImage = req.file;
        console.log(fileImage);
        
        const article = await articlesServices.createArticle({
          title,
          image: fileImage?.path,
          content,
          userId,
          categoryId  
        })
        return res.status(StatusCodes.CREATED).json({status : 201, message : "Xử lý thành công", content : article})
    } catch (error) {
        console.log(error);
        next(error)
    }
}


const deleteArticle = async (req, res, next) => {
    try {
        const id = req.query.id
        const article = await articlesServices.deleteArticle(id)
        return res.status(StatusCodes.OK).json({status : 200, message : "Xử lý thành công", content : article})
    } catch (error) {
        console.log(error);
        next(error)
    }
}
module.exports = {
    getAllArticle,
    createArticle,
    deleteArticle
}