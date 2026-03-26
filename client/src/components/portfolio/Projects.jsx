import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, ExternalLink, Code2, Zap, Shield } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const sectionRef = useRef(null)
  const projectsRef = useRef([])
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project cards
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
      description: "Engineered an asynchronous Telegram bot that automated reward claims with regex-based parsing and anti-duplicate logic. Improved client efficiency by 3x, scaling from 150-200 to 500-600 successful claims.",
      technologies: ["Python", "Asyncio", "Telethon", "Regex", "Logging"],
      icon: Zap,
      highlights: [
        "Asynchronous event handling for real-time performance",
        "Regex-based parsing for accurate data validation",
        "Anti-duplicate tracking and claim validation",
        "3x efficiency improvement for client operations"
      ],
      color: "accent"
    },
    {
      title: "Secure File Manager",
      subtitle: "Cross-Platform Security Solution",
      description: "Developed a robust file manager with integrated ClamAV malware scanning, SHA-256 encryption, and MVC architecture. Transitioned from PyQt6 prototype to production-ready JavaFX application.",
      technologies: ["Java", "JavaFX", "Python", "PyQt6", "ClamAV", "SHA-256", "MVC"],
      icon: Shield,
      highlights: [
        "Cross-platform compatibility (Java & Python)",
        "ClamAV-based malware detection and quarantine",
        "SHA-256 encryption and hashing protocols",
        "MVC architecture for maintainability"
      ],
      color: "primary"
    },
    {
      title: "NEGAI - Library Management System",
      subtitle: "Manga-Inspired UI/UX Design",
      description: "Conceptualized and designed a manga-style library management system to improve content discovery. Created high-fidelity prototypes in Figma with comprehensive product roadmap and design documentation.",
      technologies: ["Figma", "UI/UX Design", "Design Thinking", "Prototyping"],
      icon: Code2,
      highlights: [
        "Manga-inspired visual design for engagement",
        "User-centered design thinking methodology",
        "High-fidelity interactive prototypes",
        "Complete product roadmap and documentation"
      ],
      color: "accent"
    }
  ]

  const ProjectCard = ({ project, index }) => {
    const Icon = project.icon
    
    const colorConfig = {
      accent: {
        bg: 'bg-accent-50',
        text: 'text-accent-500',
        textDark: 'text-accent-700',
        hover: 'hover:text-accent-500',
        border: 'hover:border-accent-300',
        tagBg: 'bg-accent-50',
        tagText: 'text-accent-700'
      },
      primary: {
        bg: 'bg-primary-50',
        text: 'text-primary-500',
        textDark: 'text-primary-700',
        hover: 'hover:text-primary-500',
        border: 'hover:border-primary-300',
        tagBg: 'bg-primary-50',
        tagText: 'text-primary-700'
      }
    }
    
    const colors = colorConfig[project.color]
    
    return (
      <div
        ref={el => projectsRef.current[index] = el}
        className="group relative h-full"
        onClick={() => setSelectedProject(selectedProject?.title === project.title ? null : project)}
      >
        <div className={`p-8 h-full bg-white border border-neutral-200 rounded-xl hover:shadow-subtle-lg transition-all duration-300 ${colors.border} cursor-pointer hover:scale-105`}>
          {/* Icon */}
          <div className={`p-3 w-fit ${colors.bg} ${colors.text} rounded-lg mb-6 group-hover:scale-110 transition-transform`}>
            <Icon size={28} />
          </div>

          {/* Content */}
          <h3 className={`text-2xl font-bold text-primary-900 mb-2 ${colors.hover} transition-colors`}>
            {project.title}
          </h3>
          
          <p className="text-accent-600 font-semibold text-sm mb-4 uppercase tracking-wide">
            {project.subtitle}
          </p>

          <p className="text-primary-700 mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map(tech => (
                <span key={tech} className={`text-xs font-semibold px-3 py-1 ${colors.tagBg} ${colors.tagText} rounded-full`}>
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-xs font-semibold px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Expandable Details */}
          {selectedProject?.title === project.title && (
            <div className="mt-6 pt-6 border-t border-neutral-200 animate-fade-in-up">
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

          {/* Tags */}
          <div className="flex items-center gap-2 mt-6 pt-6 border-t border-neutral-200 group-hover:opacity-100 opacity-75 transition-opacity">
            <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              VIEW PROJECT
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 md:px-8 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="section-header">Featured Projects</h2>
          <p className="text-primary-700 text-lg max-w-2xl text-pretty">
            A selection of my most impactful projects showcasing technical depth, 
            problem-solving abilities, and full-stack expertise across diverse domains.
          </p>
        </div>

        {/* Projects Grid */}
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
              Screenshots and visual documentation from my portfolio work.
            </p>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group relative overflow-hidden rounded-xl bg-neutral-200 aspect-video hover:shadow-subtle-lg transition-all duration-300 hover:scale-105">
              <img 
                src="/telegram-bot.jpg" 
                alt="Telegram Sniper Bot Dashboard" 
                className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end">
                <div className="p-4 bg-gradient-to-t from-black/60 to-transparent w-full text-white">
                  <p className="font-semibold">Telegram Sniper Bot</p>
                  <p className="text-sm text-white/80">Automation & Performance</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl bg-neutral-200 aspect-video hover:shadow-subtle-lg transition-all duration-300 hover:scale-105">
              <img 
                src="/file-manager.jpg" 
                alt="Secure File Manager" 
                className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end">
                <div className="p-4 bg-gradient-to-t from-black/60 to-transparent w-full text-white">
                  <p className="font-semibold">Secure File Manager</p>
                  <p className="text-sm text-white/80">Security & Encryption</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl bg-neutral-200 aspect-video hover:shadow-subtle-lg transition-all duration-300 hover:scale-105">
              <img 
                src="/negai-design.jpg" 
                alt="NEGAI Library Design" 
                className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end">
                <div className="p-4 bg-gradient-to-t from-black/60 to-transparent w-full text-white">
                  <p className="font-semibold">NEGAI Library System</p>
                  <p className="text-sm text-white/80">UI/UX Design & Prototyping</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl bg-neutral-200 aspect-video hover:shadow-subtle-lg transition-all duration-300 hover:scale-105">
              <img 
                src="/portfolio-overview.jpg" 
                alt="Portfolio Overview" 
                className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end">
                <div className="p-4 bg-gradient-to-t from-black/60 to-transparent w-full text-white">
                  <p className="font-semibold">Portfolio Website</p>
                  <p className="text-sm text-white/80">Full Stack Development</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-6 bg-accent-50 border border-accent-200 rounded-lg">
            <h4 className="font-semibold text-primary-900 mb-2">📁 Image Gallery Management</h4>
            <p className="text-primary-700 text-sm">
              To update your project screenshots, replace the image files in the <code className="bg-white px-2 py-1 rounded text-accent-600 font-mono">public/</code> folder: 
              <code className="bg-white px-2 py-1 rounded text-accent-600 font-mono block mt-2">telegram-bot.jpg, file-manager.jpg, negai-design.jpg, portfolio-overview.jpg</code>
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center pt-16 border-t border-neutral-200">
          <p className="text-primary-700 text-lg mb-6 text-pretty">
            Interested in collaborating or want to learn more about these projects?
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://github.com/tauseefbaksh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-900 hover:bg-primary-800 text-white rounded-lg font-semibold transition-all hover:shadow-subtle-lg hover:scale-105"
            >
              <Github size={20} />
              View All on GitHub
            </a>
            <a
              href="mailto:tauseefbaksh23@lpu.in"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-900 text-primary-900 hover:bg-primary-50 rounded-lg font-semibold transition-all"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
