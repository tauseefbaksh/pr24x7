import { Helmet } from 'react-helmet-async'
import PortfolioHero from '../components/portfolio/PortfolioHero'
import Achievements from '../components/portfolio/Achievements'
import Journey from '../components/portfolio/Journey'
import Projects from '../components/portfolio/Projects'
import Footer from '../components/Footer'

const PortfolioPage = () => {
  return (
    <>
      <Helmet>
        <title>Tauseef Baksh - Full Stack Developer & Tech Innovator</title>
        <meta 
          name="description" 
          content="Tauseef Baksh - Full stack developer specializing in MERN stack, Python, and enterprise solutions. Explore my projects, achievements, and journey in technology." 
        />
        <meta name="keywords" content="developer, full stack, React, Node.js, Python, web development, portfolio" />
        <meta property="og:title" content="Tauseef Baksh - Full Stack Developer" />
        <meta property="og:description" content="Full stack developer showcasing innovative projects and technical achievements." />
      </Helmet>
      <div className="min-h-screen bg-neutral-50">
        <PortfolioHero />
        <Achievements />
        <Journey />
        <Projects />
        <Footer />
      </div>
    </>
  )
}

export default PortfolioPage
