import React, { useContext, useEffect } from 'react'
import { shopContext } from '../context/shopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSearchParams } from 'react-router-dom'

const Verify = () => {

    const  {navigate, token, setCartItems, backendUrl} = useContext(shopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if(!token) {
                return null
            }
            const response = await axios.post(backendUrl + '/api/order/verify', {success, orderId }, { headers: { token } })
            console.log(response.data)
            if(response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/cart')
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

  return (
    <div>

    </div>
  )
}

export default Verify