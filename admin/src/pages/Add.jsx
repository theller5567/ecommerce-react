import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [sizes, setSizes] = useState([])
  const [bestseller, setBestseller] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('bestseller', bestseller)

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post(backendUrl + '/api/product/add', formData, {headers: {token}})
      const { success, message } = response.data
      console.log(response)
      if(success) {
        toast.success(message)
        setName('')
        setDescription('A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.')
        setPrice('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      } else {
        toast.error(message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="text-lg mb-2" >Upload Image</p>

        <div className="flex gap-2">
          <label className="" htmlFor="image1">
            <img className={`border border-transparent w-20 cursor-pointer ${!image1 ? 'hover:border hover:border-pink-100' : ''}`} 
            src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="upload" />
            <input hidden id="image1" type="file" onChange={(e) => setImage1(e.target.files[0])} />
          </label>
          <label htmlFor="image2">
            <img className={`border border-transparent w-20 cursor-pointer ${!image2 ? 'hover:border hover:border-pink-100' : ''}`} 
            src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="upload" />
            <input hidden id="image2" type="file" onChange={(e) => setImage2(e.target.files[0])} />
          </label>
          <label htmlFor="image3">
            <img className={`border border-transparent w-20 cursor-pointer ${!image3 ? 'hover:border hover:border-pink-100' : ''}`} 
            src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="upload" />
            <input hidden id="image3" type="file" onChange={(e) => setImage3(e.target.files[0])} />
          </label>
          <label htmlFor="image4">
            <img className={`border border-transparent w-20 cursor-pointer ${!image4 ? 'hover:border hover:border-pink-100' : ''}`} 
            src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="upload" />
            <input hidden id="image4" type="file" onChange={(e) => setImage4(e.target.files[0])} />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2" >Product Name</p>
        <input className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Type Name Here..." required value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="w-full">
        <p className="mb-2" >Product Description</p>
        <textarea className="w-full max-w-[500px] px-3 py-2" placeholder="Type Description Here..." required value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">

        <div>
          <p className="mb-2">Product Category</p>
          <select className="w-full px-3 py-2" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select className="w-full px-3 py-2" name="subCategory" id="subCategory" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input className="w-full px-3 py-2 sm:w-[120px]" type="number" placeholder="25" required value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">

          <div>
            <p className={`px-3 py-1 cursor-pointer ${sizes.includes('S') ? 'bg-pink-100' : 'bg-slate-200'}`} onClick={() => setSizes(prev => prev.includes('S') ? prev.filter(size => size !== 'S') : [...prev, 'S'])}>S</p>
          </div>
          
          <div>
            <p className={`px-3 py-1 cursor-pointer ${sizes.includes('M') ? 'bg-pink-100' : 'bg-slate-200'}`} onClick={() => setSizes(prev => prev.includes('M') ? prev.filter(size => size !== 'M') : [...prev, 'M'])}>M</p>
          </div>

          <div>
            <p className={`px-3 py-1 cursor-pointer ${sizes.includes('L') ? 'bg-pink-100' : 'bg-slate-200'}`} onClick={() => setSizes(prev => prev.includes('L') ? prev.filter(size => size !== 'L') : [...prev, 'L'])}>L</p>
          </div>

          <div>
            <p className={`px-3 py-1 cursor-pointer ${sizes.includes('XL') ? 'bg-pink-100' : 'bg-slate-200'}`} onClick={() => setSizes(prev => prev.includes('XL') ? prev.filter(size => size !== 'XL') : [...prev, 'XL'])}>XL</p>
          </div>

          <div>
            <p className={`px-3 py-1 cursor-pointer ${sizes.includes('XXL') ? 'bg-pink-100' : 'bg-slate-200'}`} onClick={() => setSizes(prev => prev.includes('XXL') ? prev.filter(size => size !== 'XXL') : [...prev, 'XXL'])}>XXL</p>
          </div>

        </div>
      </div>
      <div className="flex mb-2 gap-2">
        <input type="checkbox" name="bestseller" id="bestseller" checked={bestseller} onChange={(e) => setBestseller(prev => !prev)} />
        <label className="cursor-pointer" htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className="bg-black text-white py-3 w-28 mt-4 cursor-pointer" >ADD</button>

    </form>
  )
}

export default Add