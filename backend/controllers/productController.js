import productModel from '../models/productModel.js'
import { v2 as cloudinary } from 'cloudinary'

// Create new product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter(image => image !== undefined)

        const imagesUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, {resource_type: 'image'})
                return result.secure_url
            })
        )


        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true' ? true : false,
            date: Date.now(),
        }

        console.log(productData)

        const newProduct = new productModel(productData)
        await newProduct.save()
        //const newProduct = await productModel.create(productData)
        
        res.json({ success: true, message: 'Product added successfully', product: newProduct })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}


// List all products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({ success: true, message: 'Products listed successfully', products })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message, success: false })
    }
}


// Single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body
    const product = await productModel.findById(productId)
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }
    res.json({ success: true, message: 'Product fetched successfully', product })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        //await cloudinary.uploader.destroy(req.body.image)
        
        res.json({ success: true, message: 'Product deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false,message: error.message })
    }
}

export { addProduct, listProducts, removeProduct, singleProduct }