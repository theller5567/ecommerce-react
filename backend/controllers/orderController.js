import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'
import Razorpay from 'razorpay'

// Global Variables
const currency = 'usd'
const deliveryCharge = 10

// Gateway Initialization for Stripe and Razorpay
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})
console.log("Key ID:", process.env.RAZORPAY_KEY_ID)


// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, { cartData: [] })

        res.json({ success: true, message: 'Order placed successfully', order: newOrder })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'STRIPE',
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        res.json({success: true, session_url:session.url})

       
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: error.message})
    }
}

// Verifying orders using Stripe Method
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body

    try {
        if(success) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({success: true, message: 'Order verified successfully'})
            } else {
                await orderModel.findByIdAndDelete(orderId)
                res.json({success: false, message: 'Order verification failed'})
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: error.message})
    }
}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    
    try {
        const { userId, items, amount, address } = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if(error) {
                console.error(error)
                res.status(500).json({success: false, message: error.message})
            } else {
                res.json({success: true, order})
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: error.message})
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const {userId, razorpay_order_id} = req.body
        console.log("Razorpay Order ID:", razorpay_order_id)
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({success: true, message: 'Payment successful'})
        } else {
            await orderModel.findByIdAndDelete(orderInfo.receipt)
            res.json({success: false, message: 'Payment failed'})
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: error.message})
    }
}

// All Order data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success: true, orders})
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: error.message})
    }
}

// User Order data for Frontend
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success: true, orders})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

// Update Order status from Admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })

        res.json({success: true, message: 'Order status updated'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}



export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay }