import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Hero />
        <LatestCollection />
        <BestSeller />
        <Footer />
    </div>
  )
}

export default Home