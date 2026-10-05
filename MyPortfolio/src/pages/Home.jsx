import React from 'react'

import Navbar from '../components/Navbar/Navbar'
import HeroSection from '../components/Home/HeroSection'
import AboutSection from '../components/Home/AboutSection'
import SoluctionSection from '../components/Home/SoluctionSection'
const Home = () => {
    return (
        <>
            <Navbar></Navbar>
            <main className=''>
                <HeroSection />
                <AboutSection />
                <SoluctionSection />
            </main>
        </>
    )
}

export default Home
