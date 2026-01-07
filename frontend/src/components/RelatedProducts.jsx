import React, { useContext, useState, useEffect } from 'react'
import { products } from '../assets/assets'
import ProductCard from './ProductCard'
import { shopContext } from '../context/shopContext'
import Title from './Title'

function RelatedProducts({category, subCategory}) {
    const { products } = useContext(shopContext)
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        if(products.length > 0) {
            let productsCopy = [...products]
            productsCopy = productsCopy.filter(product => product.category === category)
            productsCopy = productsCopy.filter(product => product.subCategory === subCategory)
            productsCopy = productsCopy.slice(0, 5)
            setRelatedProducts(productsCopy)
        }
    }, [products])

  return (
    <div className="my-24">
      <div className="text-center py-2 text-3xl">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
      {relatedProducts.map((product, index) => (
          <ProductCard key={index} id={product._id} image={product.image} name={product.name} price={product.price} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts