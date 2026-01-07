import React, { useState, useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import ProductCard from '../components/ProductCard'
import { shopContext } from '../context/shopContext'
import Title from '../components/Title'

const Collection = () => {
  const { products, search, showSearch } = useContext(shopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  useEffect(() => {
    applyFilters()
  }, [category, subCategory, search, showSearch])

  useEffect(() => {
    sortProducts()
  }, [sortType])

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const sortProducts = (e) => {
    let fpCopy = [...filteredProducts]
    switch (sortType) {
      case 'low-high':
        setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price))
        break
      case 'high-low':
        setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price))
        break
      default:
        applyFilters()
        break
    }
  }

  const applyFilters = () => {
    let productsCopy = [...products]

    if (search && showSearch) {
      productsCopy = productsCopy.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(product => category.includes(product.category))
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(product => subCategory.includes(product.subCategory))
    }
    setFilteredProducts(productsCopy)
  }

  

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* Filters */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <img src={assets.dropdown_icon} alt="dropdown" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>
        
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={`Men`} onChange={(toggleCategory)} />Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={`Women`} onChange={(toggleCategory)} />Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={`Kids`} onChange={(toggleCategory)} />Kids
            </p>
          </div>
        </div>

        {/* Sub Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className="flex gap-2">
              <input onChange={toggleSubCategory} className="w-3" type="checkbox" value={`Topwear`} />Topwear
            </p>
            <p className="flex gap-2">
              <input onChange={toggleSubCategory} className="w-3" type="checkbox" value={`Bottomwear`} />Bottomwear
            </p>
            <p className="flex gap-2">
              <input onChange={toggleSubCategory} className="w-3" type="checkbox" value={`Winterwear`} />Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />

          {/* ProductSorting */}
          <select onChange={(e) => setSortType(e.target.value)} name="sort" id="sort" className="border border-gray-300 text-sm px-2">
            <option value="relevant">Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} id={product._id} image={product.image} name={product.name} price={product.price} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Collection