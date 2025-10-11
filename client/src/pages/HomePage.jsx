import React from 'react'
import Navbar from '../components/NavBar'
import Hero from '../components/Hero'
import Newsletters from '../components/NewsLetter'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Newsletters/>
      <Footer/>
    </div>
  )
}

export default HomePage