import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, Code, Briefcase } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Journey = () => {
  const sectionRef = useRef(null)
  const timelineRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(timelineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
        },
        duration: 0.8,
        opacity: 0,
        x: (index) => (index % 2 === 0 ? -50 : 50),
        stagger: 0.2,
        ease: 'power3.out'
      })

      const timelineLine = sectionRef.current?.querySelector('.timeline-line')
      if (timelineLine) {
        gsap.from(timelineLine, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
          duration: 1,
          height: 0,
          ease: 'power2.out'
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const journeyItems = [
    {
      year: "Aug 2023 - Present",
      title: "Bachelor of Technology - CSE",
      institution: "Lovely Professional University",
      description: "Pursuing degree in Computer Science Engineering with focus on full-stack development and AI.",
      icon: BookOpen,
      type: "education"
    },
    {
      year: "2023 - Present",
      title: "Full Stack Developer",
      institution: "Independent Projects",
      description: "Building production-grade applications with React, Node.js, Python, and modern cloud services.",
      icon: Code,
      type: "experience"
    },
    {
      year: "2024",
      title: "AI & Generative Tools Master",
      institution: "Udemy Certification",
      description: "Completed comprehensive course on Generative AI, LLMs, and modern AI applications.",
      icon: BookOpen,
      type: "education"
    },
    {
      year: "2024",
      title: "GFG x LPU Innovathon Winner",
      institution: "GeeksforGeeks",
      description: "Won 1st position in innovation competition with cutting-edge solution for real-world problem.",
      icon: Briefcase,
      type: "achievement"
    }
  ]

  const skills = {
    "Frontend": ["React", "Next.js", "Tailwind CSS", "GSAP", "Framer Motion"],
    "Backend": ["Node.js", "Python", "Express", "MongoDB", "PostgreSQL"],
    "Tools": ["Git", "Docker", "Figma", "VS Code", "Vercel"]
  }

  return (
    <section id="journey" ref={sectionRef} className="py-20 px-4 md:px-8 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="section-header">My Journey</h2>
          <p className="text-primary-700 text-lg max-w-2xl text-pretty">
            Educational background, professional milestones, and continuous growth in technology.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-20">
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent-400 to-accent-200 rounded-full"></div>

          <div className="space-y-12">
            {journeyItems.map((item, idx) => {
              const Icon = item.icon
              const isEven = idx % 2 === 0
              
              return (
                <div
                  key={idx}
                  ref={el => timelineRef.current[idx] = el}
                  className={`relative flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center gap-8`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-4 border-accent-500 rounded-full flex items-center justify-center z-10">
                    <Icon className="text-accent-500" size={20} />
                  </div>

                  {/* Content */}
                  <div className={`w-1/2 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="p-6 bg-white border border-neutral-200 rounded-xl hover:shadow-subtle-lg transition-all duration-300">
                      <div className="text-accent-600 text-sm font-semibold mb-2">{item.year}</div>
                      <h3 className="text-lg font-bold text-primary-900 mb-1">{item.title}</h3>
                      <p className="text-primary-600 text-sm mb-3">{item.institution}</p>
                      <p className="text-primary-700 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20 pt-16 border-t border-neutral-200">
          <h3 className="text-2xl font-bold text-primary-900 mb-12">Skills & Technologies</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="p-6 bg-white border border-neutral-200 rounded-xl">
                <h4 className="font-bold text-primary-900 mb-4">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillList.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-accent-50 text-accent-700 text-sm font-semibold rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Journey
