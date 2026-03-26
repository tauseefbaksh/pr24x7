import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, Trophy, Star, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Achievements = () => {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate achievement items when scrolled into view
      gsap.from(itemsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 30%',
          markers: false,
        },
        duration: 0.8,
        opacity: 0,
        y: 40,
        stagger: 0.15,
        ease: 'back.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const achievements = [
    {
      icon: Trophy,
      title: "GFG x LPU Innovathon Winner",
      description: "Secured 1st position in the GeeksforGeeks x Lovely Professional University Innovathon competition",
      category: "Competition"
    },
    {
      icon: Award,
      title: "AI & Generative Tools Certified",
      description: "Master Generative AI & Generative AI Tools certification from Udemy with advanced LLM expertise",
      category: "Certification"
    },
    {
      icon: Star,
      title: "Hackathon Participant & Developer",
      description: "Competed in Code-A-Haunt and Code Caravan 2.0 24-hour hackathons, built full-stack solutions",
      category: "Hackathon"
    },
    {
      icon: Zap,
      title: "Cloud Computing Certified",
      description: "IBM Introduction to Cloud Computing certification from Coursera, foundational cloud expertise",
      category: "Certification"
    },
    {
      icon: Award,
      title: "Java Development Bootcamp",
      description: "Placement Ace: Java Bootcamp Certification with LeetCode-Codeforces edition mastery",
      category: "Training"
    },
    {
      icon: Star,
      title: "Computational Theory Expert",
      description: "Certified in Computational Theory: Language Principles & Finite Automata from Infosys Springboard",
      category: "Certification"
    }
  ]

  return (
    <section id="achievements" ref={sectionRef} className="py-20 px-4 md:px-8 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="section-header">Achievements & Certifications</h2>
          <p className="text-primary-700 text-lg max-w-2xl text-pretty">
            Recognized expertise across competitive programming, cloud infrastructure, and AI technologies, 
            demonstrated through multiple certifications and competition victories.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <div
                key={index}
                ref={el => itemsRef.current[index] = el}
                className="group p-6 bg-white border border-neutral-200 rounded-xl hover:shadow-subtle-lg transition-all duration-300 hover:border-accent-300 hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent-50 rounded-lg text-accent-500 group-hover:bg-accent-100 transition-colors">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-accent-500 mb-2 uppercase tracking-wide">
                      {achievement.category}
                    </div>
                    <h3 className="text-lg font-semibold text-primary-900 mb-2 group-hover:text-accent-500 transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-primary-700 text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Certifications", value: "6+" },
            { label: "Hackathons", value: "2+" },
            { label: "Projects", value: "10+" },
            { label: "Years Experience", value: "2+" }
          ].map((stat, idx) => (
            <div
              key={idx}
              ref={el => itemsRef.current[achievements.length + idx] = el}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-accent-500 mb-2">
                {stat.value}
              </div>
              <p className="text-primary-700 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
