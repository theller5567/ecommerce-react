import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        // checking user already exists or not
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }
        // checking password is correct or not
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (isPasswordCorrect) {
            const token = createToken(user._id)
            res.json({ success: true, message: 'User logged in successfully', token })
        } else {
            return res.json({ success: false, message: 'Invalid password' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

// Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // checking user already exists or not
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: 'User already exists' })
        }
        // validating email and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Password must be at least 8 characters long' })
        }
        // hashing user's password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // creating new user
        const newUser = new userModel({ 
            name, 
            email, 
            password: hashedPassword 
        })
        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({ success: true, message: 'User registered successfully', token })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

//Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({ success: true, message: 'Admin logged in successfully', token })
        } else {
            return res.status(401).json({ success: false, message: 'Invalid email or password' })
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export { loginUser, registerUser, adminLogin }