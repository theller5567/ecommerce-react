import React, { useState, useContext } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { shopContext } from '../context/shopContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const PlaceOrder = () => {
  const { backendUrl, token, navigate, cartItems, getCartAmount, currency, delivery_fee, products, setCartItems } = useContext(shopContext)
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })
  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }
    
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []
      for(const itemId in cartItems) {
        for(const size in cartItems[itemId]) {
          if(cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === itemId))
            if(itemInfo) {
              itemInfo.size = size
              itemInfo.quantity = cartItems[itemId][size]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
      }
      switch(paymentMethod) {
      //API calls for COD Method
      case 'cod':
        const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
        console.log(response.data)
        const { successCOD, messageCOD } = response.data
        if(successCOD) {
          setCartItems({})
          toast.success(messageCOD)
          navigate('/orders')
        } else {
          toast.error(messageCOD)
        }
        break
      case 'stripe':
        const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
        console.log(responseStripe.data)
        if(responseStripe.data.success) {
          console.log('session_url: ',responseStripe.data.session_url)
          window.location.replace(responseStripe.data.session_url)
        } else {
          toast.error(responseStripe.data.message)
        }
        break;
      //API calls for Razorpay Method
      case 'razorpay':
        const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
        console.log(responseRazorpay.data)
        if(responseRazorpay.data.success) {
          initPay(responseRazorpay.data.order)
        }
        break;
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Payment for your order',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyrazorpay', response, { headers: { token } })
          if(data.success) {
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.error(error)
          toast.error(error)
        }
      }
    }
    const razorpay = new window.Razorpay(options)
    razorpay.open()
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} type="text" placeholder="First Name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} type="text" placeholder="Last Name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input required onChange={onChangeHandler} name="email" value={formData.email} type="email" placeholder="Email Address" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <input required onChange={onChangeHandler} name="street" value={formData.street} type="text" placeholder="Street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="city" value={formData.city} type="text" placeholder="City" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input required onChange={onChangeHandler} name="state" value={formData.state} type="text" placeholder="State" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} type="number" placeholder="Zip Code" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input required onChange={onChangeHandler} name="country" value={formData.country} type="text" placeholder="Country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input required onChange={onChangeHandler} name="phone" value={formData.phone} type="number" placeholder="Phone" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
      </div>
      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-20">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          {/* Payment Methods */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex items-center gao-3 border p-2 px-3 cursor-pointer">
              <p onClick={()=> setPaymentMethod('stripe')} className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} alt="" className="h-5 mx-4" />
            </div>
            <div className="flex items-center gao-3 border p-2 px-3 cursor-pointer">
              <p onClick={()=> setPaymentMethod('razorpay')} className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="" className="h-5 mx-4" />
            </div>
            <div className="flex items-center gao-3 border p-2 px-3 cursor-pointer">
              <p onClick={()=> setPaymentMethod('cod')} className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-sm mx-4 text-gray-500">CASH ON DELIVERY</p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white text-sm px-16 py-3 cursor-pointer">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder