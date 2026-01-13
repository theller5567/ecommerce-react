import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { shopContext } from '../context/shopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(shopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const fetchProductData = async () => {
    products.map((product) => {
      if(product._id === productId) {
        setProductData(product)
        setImage(product.image[0])
        return null
      }
    })
  }

 useEffect(() => {
  fetchProductData()
 }, [])


  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full no-scrollbar">
            {productData.image.map((image, index) => (
              <img onClick={() => setImage(image)} key={index} src={image} alt={productData.name} className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer" />
            ))}
          </div>
          {/* Product Image Big */}
          <div className="w-full sm:w-[80%]">
            <img src={image} alt={productData.name} className="w-full h-auto" />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-medium mt-2">{productData.name}</h2>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} 
                key={index} 
                className={`border border-gray-100 cursor-pointer px-4 py-2 ${item === size ? 'border-orange-500' : ''}`}
                disabled={item === size}
                >{item}</button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex-flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section*/}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm text-gray-500">Description</b>
          <p className="border px-5 py-3 text-sm text-gray-500">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p className="">lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis dolor sed dolorum eveniet est totam, libero sit impedit ex quam nihil ducimus quo optio velit nisi repellat. Fugiat, laborum obcaecati!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis dolor sed dolorum eveniet est totam, libero sit impedit ex quam nihil ducimus quo optio velit nisi repellat. Fugiat, laborum obcaecati!</p>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />


    </div>
  ) : (
    <div className="opacity-0">Product not found</div>
  )
}

export default Product