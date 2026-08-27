import React from 'react'

import Navbar from '../components/Navbar/Navbar'
import HeroSection from '../components/Home/HeroSection'
const Home = () => {
    return (
        <>
            <Navbar></Navbar>
            <main className=''>
                <HeroSection />
            </main>
        </>
    )
}

export default Home
