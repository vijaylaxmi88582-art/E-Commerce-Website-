const Product = require('../models/product')
const cloudinary = require('../config/cloudinary')

exports.createProduct = async (req, res) => {
    try {
        const { productName, price, description, category } = req.body
        let images = []
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path, { folder: 'products' })
            images.push({ url: result.secure_url, publicId: result.public_id })
        }
        const product = await Product.create({ productName, price, description, category, images })
        res.status(201).json({ message: 'Product Created', product })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const product = await Product.find().populate('category')
        res.status(200).json({ message: 'Product Found', product })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' })
        }
        for (const img of product.images) {
            await cloudinary.uploader.destroy(img.publicId)
        }
        await product.deleteOne()
        res.status(200).json({ message: 'Product Deleted' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error', error })
    }
}
