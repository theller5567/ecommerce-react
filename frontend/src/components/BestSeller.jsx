import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import Title from './Title'
import ProductCard from './ProductCard'
import { shopContext } from '../context/shopContext'

function BestSeller() {

    const { products } = useContext(shopContext)
    const [bestSellerProducts, setBestSellerProducts] = useState([])

    useEffect(() => {
        const bestSellerProducts = products.filter(product => product.bestseller).slice(0, 5)
        setBestSellerProducts(bestSellerProducts)
    }, [])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1="BEST" text2="SELLERS" />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {bestSellerProducts.map((product, index) => (
                <ProductCard key={index} id={product._id} image={product.image} name={product.name} price={product.price} />
            ))}
        </div>
    </div>
  )
}

export default BestSeller