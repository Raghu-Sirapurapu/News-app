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
      <div className='px-2 md:px-0 lg:px-12'>
        <Newsletters/>
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage