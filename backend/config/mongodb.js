import mongoose from 'mongoose'

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected')
    })
    mongoose.connection.on('error', (error) => {
        console.error(error)
    })
    
    await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`, { dbName: 'ecommerce'})
}

export default connectDB