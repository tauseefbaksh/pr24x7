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
      gsap.from(itemsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 30%',
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
      description: "Secured 1st position in the GeeksforGeeks x Lovely Professional University Innovathon",
      stat: "1st Place"
    },
    {
      icon: Award,
      title: "AI & Generative Tools Certified",
      description: "Master Generative AI certification from Udemy with advanced LLM expertise",
      stat: "Certified"
    },
    {
      icon: Star,
      title: "Hackathon Participant",
      description: "Competed in Code-A-Haunt and Code Caravan 24-hour hackathons",
      stat: "2+ Events"
    },
    {
      icon: Zap,
      title: "Full Stack Developer",
      description: "Built 10+ production projects with MERN stack, Python, and modern tools",
      stat: "10+ Projects"
    }
  ]

  return (
    <section id="achievements" ref={sectionRef} className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="section-header">Achievements & Highlights</h2>
          <p className="text-primary-700 text-lg max-w-2xl text-pretty">
            Key milestones and recognitions that showcase my dedication to excellence and continuous learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, idx) => {
            const Icon = achievement.icon
            return (
              <div
                key={idx}
                ref={el => itemsRef.current[idx] = el}
                className="p-6 bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 rounded-xl hover:shadow-subtle-lg hover:border-accent-300 transition-all duration-300 group"
              >
                <div className="mb-4 inline-flex p-3 bg-accent-50 rounded-lg group-hover:scale-110 transition-transform">
                  <Icon className="text-accent-500" size={24} />
                </div>
                <h3 className="font-bold text-primary-900 mb-2 text-lg">{achievement.title}</h3>
                <p className="text-primary-700 text-sm mb-4">{achievement.description}</p>
                <div className="text-accent-600 font-bold text-sm">{achievement.stat}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Achievements
