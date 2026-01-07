import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} alt="contact" className='w-full md:max-w-[480px]' />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600 ">Our Store</p>
          <p className="text-gray-500">54709 Williams Station<br />White Plains, NY 10603</p>
          <p className="text-gray-500">Tel: (+1) 917-555-1011 <br /> Suite 350, New York, NY 10001</p>
          <p className="font-semibold text-gray-600 text-xl">Careers at Forever</p>
          <p className="text-gray-500">Learn more about career opportunities at Forever.</p>
          <button className="border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-500 cursor-pointer">EXPLORE JOBS</button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default Contact