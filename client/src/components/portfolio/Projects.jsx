import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Zap, Shield, Code2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const sectionRef = useRef(null)
  const projectsRef = useRef([])
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(projectsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
        },
        duration: 0.8,
        opacity: 0,
        y: 40,
        stagger: 0.2,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const projects = [
    {
      title: "Telegram Sniper Bot",
      subtitle: "High-Performance Reward Automation",
      description: "Engineered an asynchronous Telegram bot that automated reward claims with regex-based parsing. Improved client efficiency by 3x.",
      technologies: ["Python", "Asyncio", "Telethon", "Regex"],
      icon: Zap,
      highlights: [
        "Asynchronous event handling for real-time performance",
        "Regex-based parsing for accurate data validation",
        "3x efficiency improvement for client operations"
      ],
      color: "accent"
    },
    {
      title: "Secure File Manager",
      subtitle: "Cross-Platform Security Solution",
      description: "Developed a robust file manager with integrated ClamAV malware scanning and SHA-256 encryption.",
      technologies: ["Java", "JavaFX", "Python", "ClamAV"],
      icon: Shield,
      highlights: [
        "ClamAV-based malware detection and quarantine",
        "SHA-256 encryption and hashing protocols",
        "MVC architecture for maintainability"
      ],
      color: "primary"
    },
    {
      title: "NEGAI Library System",
      subtitle: "Manga-Inspired UI/UX Design",
      description: "Conceptualized a manga-style library management system with high-fidelity prototypes in Figma.",
      technologies: ["Figma", "UI/UX Design", "Prototyping"],
      icon: Code2,
      highlights: [
        "Manga-inspired visual design for engagement",
        "User-centered design thinking methodology",
        "Complete product roadmap and documentation"
      ],
      color: "accent"
    }
  ]

  const ProjectCard = ({ project, index }) => {
    const Icon = project.icon
    
    const colorClasses = project.color === "accent" 
      ? { bg: 'bg-accent-50', text: 'text-accent-500', tag: 'text-accent-700' }
      : { bg: 'bg-primary-50', text: 'text-primary-500', tag: 'text-primary-700' }
    
    return (
      <div
        ref={el => projectsRef.current[index] = el}
        className="group relative h-full"
        onClick={() => setSelectedProject(selectedProject?.title === project.title ? null : project)}
      >
        <div className="p-8 h-full bg-white border border-neutral-200 rounded-xl hover:shadow-subtle-lg transition-all duration-300 cursor-pointer hover:scale-105">
          <div className={`p-3 w-fit ${colorClasses.bg} ${colorClasses.text} rounded-lg mb-6 group-hover:scale-110 transition-transform`}>
            <Icon size={28} />
          </div>

          <h3 className="text-2xl font-bold text-primary-900 mb-2">
            {project.title}
          </h3>
          
          <p className="text-accent-600 font-semibold text-sm mb-4 uppercase tracking-wide">
            {project.subtitle}
          </p>

          <p className="text-primary-700 mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map(tech => (
                <span key={tech} className={`text-xs font-semibold px-3 py-1 ${colorClasses.bg} ${colorClasses.tag} rounded-full`}>
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs font-semibold px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>

          {selectedProject?.title === project.title && (
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <h4 className="font-bold text-primary-900 mb-3">Key Features</h4>
              <ul className="space-y-2">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-3 text-primary-700 text-sm">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-2 mt-6 pt-6 border-t border-neutral-200 opacity-75 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              CLICK FOR DETAILS
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="section-header">Featured Projects</h2>
          <p className="text-primary-700 text-lg max-w-2xl text-pretty">
            A selection of my most impactful projects showcasing technical depth and full-stack expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Gallery Section */}
        <div className="mt-20 pt-16 border-t border-neutral-200">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-primary-900 mb-4">Project Gallery</h3>
            <p className="text-primary-700 text-lg">
              Screenshots from my portfolio work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-accent-100 to-primary-100 aspect-video hover:shadow-subtle-lg transition-all duration-300 hover:scale-105 flex items-center justify-center">
              <img 
                src="/telegram-bot.jpg" 
                alt="Telegram Sniper Bot Dashboard" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-accent-100 to-primary-100 aspect-video hover:shadow-subtle-lg transition-all duration-300 hover:scale-105 flex items-center justify-center">
              <img 
                src="/file-manager.jpg" 
                alt="Secure File Manager" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-accent-100 to-primary-100 aspect-video hover:shadow-subtle-lg transition-all duration-300 hover:scale-105 flex items-center justify-center">
              <img 
                src="/negai-design.jpg" 
                alt="NEGAI Library Design" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-accent-100 to-primary-100 aspect-video hover:shadow-subtle-lg transition-all duration-300 hover:scale-105 flex items-center justify-center">
              <img 
                src="/portfolio-overview.jpg" 
                alt="Portfolio Overview" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center pt-16 border-t border-neutral-200">
          <p className="text-primary-700 text-lg mb-6">
            Interested in collaborating or want to learn more?
          </p>
          <a
            href="https://github.com/tauseefbaksh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-900 hover:bg-primary-800 text-white rounded-lg font-semibold transition-all hover:shadow-subtle-lg hover:scale-105"
          >
            <Github size={20} />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
