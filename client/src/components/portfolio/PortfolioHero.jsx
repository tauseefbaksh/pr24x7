import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PortfolioHero = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered animations on mount
      gsap.from([titleRef.current, subtitleRef.current, descRef.current, ctaRef.current], {
        duration: 1,
        opacity: 0,
        y: 30,
        stagger: 0.2,
        ease: 'power3.out'
      })
    })

    return () => ctx.revert()
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 md:px-8 bg-gradient-to-br from-neutral-50 via-neutral-50 to-accent-50">
      <div className="max-w-4xl w-full">
        {/* Navigation Links */}
        <div className="flex gap-8 mb-16 text-sm font-medium">
          <button 
            onClick={() => scrollToSection('achievements')}
            className="text-primary-600 hover:text-accent-500 transition-colors"
          >
            Achievements
          </button>
          <button 
            onClick={() => scrollToSection('journey')}
            className="text-primary-600 hover:text-accent-500 transition-colors"
          >
            Journey
          </button>
          <button 
            onClick={() => scrollToSection('projects')}
            className="text-primary-600 hover:text-accent-500 transition-colors"
          >
            Projects
          </button>
        </div>

        {/* Main Content */}
        <div>
          <div ref={subtitleRef} className="text-accent-500 font-semibold tracking-wide mb-6">
            Full Stack Developer • Problem Solver • Tech Enthusiast
          </div>

          <h1 
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary-900 mb-6 leading-tight text-pretty"
          >
            Tauseef Baksh
          </h1>

          <p 
            ref={descRef}
            className="text-lg md:text-xl text-primary-700 max-w-2xl mb-8 leading-relaxed text-pretty"
          >
            I craft scalable, high-performance solutions leveraging modern technologies like React, Node.js, and Python. From AI-powered bots to secure file managers, I turn complex challenges into elegant code. Currently pursuing CSE at LPU, constantly learning and building innovative projects.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-primary-900 hover:bg-primary-800 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-subtle-lg hover:scale-105"
            >
              Explore Projects
            </button>
            <a
              href="https://github.com/tauseefbaksh"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-primary-900 text-primary-900 hover:bg-primary-50 rounded-lg font-semibold transition-all duration-300"
            >
              View Code
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href="https://github.com/tauseefbaksh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-accent-500 transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/tauseef-baksh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-accent-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:tauseefbaksh23@lpu.in"
              className="text-primary-600 hover:text-accent-500 transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioHero
