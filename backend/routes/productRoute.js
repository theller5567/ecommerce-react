import express from 'express'
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const productRouter = express.Router()

productRouter.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 10 }, 
    { name: 'image2', maxCount: 10 },
    { name: 'image3', maxCount: 10 }, 
    { name: 'image4', maxCount: 10 }
]), addProduct)
productRouter.post('/remove', adminAuth, removeProduct)
productRouter.post('/single', adminAuth, singleProduct)
productRouter.get('/list', listProducts)

export default productRouter