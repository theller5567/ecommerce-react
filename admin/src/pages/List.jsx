import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'


const List = ({token}) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list', {headers: {token}})
      const { success, message, products } = response.data
      if(success) {
        setList(products)
        console.log(products)
      } else {
        toast.error(message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    console.log(id)
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers: {token}})
      const { success, message } = response.data
      if(success) {
        toast.success(message)
        await fetchList()
      } else {
        toast.error(message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])


  return (
    <>
      <p className="text-2xl font-bold mb-2">All Products List</p>
      <div className="flex flex-col gap-2">

        {/* ---------- List Table Title ---------- */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ---------- Product List ---------- */}

        {list.map((product, index) => (
          <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm border-gray-300">
            <img src={product.image[0]} alt="" className="w-12 h-12" />
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>{currency}{product.price}</p>
            <p className="text-right md:text-center cursor-pointer text-lg" onClick={() => removeProduct(product._id)}>X</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default List