import Navbar from '../components/Navbar/Navbar'
import HeroSection from '../components/Home/HeroSection'
import AboutSection from '../components/Home/AboutSection'
import SoluctionSection from '../components/Home/SoluctionSection'
import FormationSection from '../components/Home/FormationSection'
import ArticlesSection from '../components/Home/ArticlesSection'
import ContactSection from '../components/Home/ContactSection'

const Home = () => {
    return (
        <>
            <Navbar></Navbar>
            <main className=''>
                <HeroSection />
                <AboutSection />
                <SoluctionSection />
                <FormationSection />
                <ArticlesSection />
                <ContactSection />
            </main>
        </>
    )
}

export default Home
