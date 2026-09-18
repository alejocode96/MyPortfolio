import React from 'react'

import Navbar from '../components/Navbar/Navbar'
import HeroSection from '../components/Home/HeroSection'
import AboutSection from '../components/Home/AboutSection'
const Home = () => {
    return (
        <>
            <Navbar></Navbar>
            <main className=''>
                <HeroSection />
                <AboutSection />
            </main>
        </>
    )
}

export default Home
