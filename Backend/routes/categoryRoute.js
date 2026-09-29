const express = require('express')
const categoryRouter = express.Router()


const upload = require('../middleware/upload')
const auth = require('../middleware/auth')
const {createCategory,getCategory,updateCategory,deleteCategory} = require('../controllers/categoryController')

categoryRouter.post('/create-category',auth,upload.single('image'),createCategory)
categoryRouter.get('/all-category',getCategory)
categoryRouter.put('/update/:id',auth,upload.single('image'),updateCategory)
categoryRouter.delete('/delete/:id',auth,deleteCategory)

module.exports = categoryRouter