import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, Code, Briefcase, GraduationCap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Journey = () => {
  const sectionRef = useRef(null)
  const timelineRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger timeline items
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

      // Animate timeline line
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
      location: "Phagwara, Punjab",
      description: "Currently pursuing CSE degree with focus on full-stack development and advanced algorithms. CGPA: 7.27",
      icon: GraduationCap,
      type: "education"
    },
    {
      year: "Sep 2025 - Nov 2025",
      title: "Web Development Intern",
      institution: "Vanillakart (Emvity Brushflicks)",
      location: "Remote",
      description: "Executed full-stack MERN projects and WordPress websites. Developed responsive client-facing applications with UX focus.",
      icon: Briefcase,
      type: "experience"
    },
    {
      year: "Apr 2021 - Mar 2022",
      title: "Intermediate Education",
      institution: "The Woods Heritage School",
      location: "Jhansi, Uttar Pradesh",
      description: "Completed intermediate education with 78% aggregate. Foundation for technical pursuits.",
      icon: BookOpen,
      type: "education"
    },
    {
      year: "Apr 2019 - Mar 2020",
      title: "Secondary Education",
      institution: "The Woods Heritage School",
      location: "Jhansi, Uttar Pradesh",
      description: "Completed matriculation with 82% aggregate. Developed strong academic fundamentals.",
      icon: Code,
      type: "education"
    }
  ]

  return (
    <section id="journey" ref={sectionRef} className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="section-header">My Journey</h2>
          <p className="text-primary-700 text-lg max-w-2xl text-pretty">
            An educational and professional trajectory shaped by curiosity, continuous learning, 
            and practical application of technology across diverse domains.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-500 via-accent-300 to-accent-100 timeline-line" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {journeyItems.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  ref={el => timelineRef.current[index] = el}
                  className="md:flex md:gap-16"
                >
                  {/* Timeline Dot - Desktop */}
                  <div className="hidden md:flex md:w-16 md:justify-end md:flex-shrink-0">
                    <div className="relative z-10">
                      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-6">
                        <div className="w-8 h-8 bg-white border-3 border-accent-500 rounded-full flex items-center justify-center shadow-subtle-lg">
                          <div className="w-3 h-3 bg-accent-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:flex-1">
                    <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-xl hover:border-accent-300 hover:shadow-subtle transition-all duration-300 group">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 rounded-lg flex-shrink-0 ${
                          item.type === 'education' 
                            ? 'bg-accent-50 text-accent-500' 
                            : 'bg-primary-50 text-primary-600'
                        }`}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-accent-500 uppercase tracking-wide mb-1">
                            {item.year}
                          </div>
                          <h3 className="text-xl font-bold text-primary-900 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-primary-600 font-semibold mb-2">
                            {item.institution}
                          </p>
                          <p className="text-sm text-primary-500 mb-3">
                            📍 {item.location}
                          </p>
                        </div>
                      </div>
                      <p className="text-primary-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Skills Overview */}
        <div className="mt-16 pt-16 border-t border-neutral-200">
          <h3 className="text-2xl font-bold text-primary-900 mb-8">Technical Skills & Tools</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-primary-900 mb-4">Languages & Frameworks</h4>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Express.js', 'Spring Boot', 'PHP'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-accent-50 text-accent-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-primary-900 mb-4">Databases & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {['MySQL', 'MongoDB', 'SQLite', 'Git', 'Docker', 'XAMPP', 'Figma', 'Firebase'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-semibold text-primary-900 mb-4">Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              {['Resilience', 'Analytical Thinking', 'Problem Solving', 'Detail Oriented', 'Leadership', 'Communication'].map(skill => (
                <span key={skill} className="px-4 py-2 bg-accent-50 text-accent-700 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Journey
