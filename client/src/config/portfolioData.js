// Portfolio Configuration - Update all your content here

export const portfolioData = {
  hero: {
    name: "Tauseef Baksh",
    title: "Full Stack Developer • Problem Solver • Tech Enthusiast",
    description: `I craft scalable, high-performance solutions leveraging modern technologies like React, Node.js, and Python. From AI-powered bots to secure file managers, I turn complex challenges into elegant code. Currently pursuing CSE at LPU, constantly learning and building innovative projects.`,
    github: "https://github.com/tauseefbaksh",
    linkedin: "https://linkedin.com/in/tauseef-baksh",
    email: "tauseefbaksh23@lpu.in",
    phone: "+91-9795420781"
  },

  achievements: [
    {
      title: "GFG x LPU Innovathon Winner",
      description: "Secured 1st position in the GeeksforGeeks x Lovely Professional University Innovathon competition",
      category: "Competition"
    },
    {
      title: "AI & Generative Tools Certified",
      description: "Master Generative AI & Generative AI Tools certification from Udemy with advanced LLM expertise",
      category: "Certification"
    },
    {
      title: "Hackathon Participant & Developer",
      description: "Competed in Code-A-Haunt and Code Caravan 2.0 24-hour hackathons, built full-stack solutions",
      category: "Hackathon"
    },
    {
      title: "Cloud Computing Certified",
      description: "IBM Introduction to Cloud Computing certification from Coursera, foundational cloud expertise",
      category: "Certification"
    },
    {
      title: "Java Development Bootcamp",
      description: "Placement Ace: Java Bootcamp Certification with LeetCode-Codeforces edition mastery",
      category: "Training"
    },
    {
      title: "Computational Theory Expert",
      description: "Certified in Computational Theory: Language Principles & Finite Automata from Infosys Springboard",
      category: "Certification"
    }
  ],

  stats: [
    { label: "Certifications", value: "6+" },
    { label: "Hackathons", value: "2+" },
    { label: "Projects", value: "10+" },
    { label: "Years Experience", value: "2+" }
  ],

  journey: [
    {
      year: "Aug 2023 - Present",
      title: "Bachelor of Technology - CSE",
      institution: "Lovely Professional University",
      location: "Phagwara, Punjab",
      description: "Currently pursuing CSE degree with focus on full-stack development and advanced algorithms. CGPA: 7.27",
      type: "education"
    },
    {
      year: "Sep 2025 - Nov 2025",
      title: "Web Development Intern",
      institution: "Vanillakart (Emvity Brushflicks)",
      location: "Remote",
      description: "Executed full-stack MERN projects and WordPress websites. Developed responsive client-facing applications with UX focus.",
      type: "experience"
    },
    {
      year: "Apr 2021 - Mar 2022",
      title: "Intermediate Education",
      institution: "The Woods Heritage School",
      location: "Jhansi, Uttar Pradesh",
      description: "Completed intermediate education with 78% aggregate. Foundation for technical pursuits.",
      type: "education"
    },
    {
      year: "Apr 2019 - Mar 2020",
      title: "Secondary Education",
      institution: "The Woods Heritage School",
      location: "Jhansi, Uttar Pradesh",
      description: "Completed matriculation with 82% aggregate. Developed strong academic fundamentals.",
      type: "education"
    }
  ],

  skills: {
    languages: ["JavaScript", "Python", "Java", "C++", "React", "Node.js", "Express.js", "Spring Boot", "PHP"],
    databases: ["MySQL", "MongoDB", "SQLite", "Git", "Docker", "XAMPP", "Figma", "Firebase"],
    soft: ["Resilience", "Analytical Thinking", "Problem Solving", "Detail Oriented", "Leadership", "Communication"]
  },

  projects: [
    {
      title: "Telegram Sniper Bot",
      subtitle: "High-Performance Reward Automation",
      description: "Engineered an asynchronous Telegram bot that automated reward claims with regex-based parsing and anti-duplicate logic. Improved client efficiency by 3x, scaling from 150-200 to 500-600 successful claims.",
      technologies: ["Python", "Asyncio", "Telethon", "Regex", "Logging"],
      highlights: [
        "Asynchronous event handling for real-time performance",
        "Regex-based parsing for accurate data validation",
        "Anti-duplicate tracking and claim validation",
        "3x efficiency improvement for client operations"
      ],
      color: "accent",
      image: "/telegram-bot.jpg",
      imageAlt: "Telegram Sniper Bot Dashboard"
    },
    {
      title: "Secure File Manager",
      subtitle: "Cross-Platform Security Solution",
      description: "Developed a robust file manager with integrated ClamAV malware scanning, SHA-256 encryption, and MVC architecture. Transitioned from PyQt6 prototype to production-ready JavaFX application.",
      technologies: ["Java", "JavaFX", "Python", "PyQt6", "ClamAV", "SHA-256", "MVC"],
      highlights: [
        "Cross-platform compatibility (Java & Python)",
        "ClamAV-based malware detection and quarantine",
        "SHA-256 encryption and hashing protocols",
        "MVC architecture for maintainability"
      ],
      color: "primary",
      image: "/file-manager.jpg",
      imageAlt: "Secure File Manager"
    },
    {
      title: "NEGAI - Library Management System",
      subtitle: "Manga-Inspired UI/UX Design",
      description: "Conceptualized and designed a manga-style library management system to improve content discovery. Created high-fidelity prototypes in Figma with comprehensive product roadmap and design documentation.",
      technologies: ["Figma", "UI/UX Design", "Design Thinking", "Prototyping"],
      highlights: [
        "Manga-inspired visual design for engagement",
        "User-centered design thinking methodology",
        "High-fidelity interactive prototypes",
        "Complete product roadmap and documentation"
      ],
      color: "accent",
      image: "/negai-design.jpg",
      imageAlt: "NEGAI Library Design"
    }
  ],

  gallery: [
    {
      image: "/telegram-bot.jpg",
      alt: "Telegram Sniper Bot Dashboard",
      title: "Telegram Sniper Bot",
      category: "Automation & Performance"
    },
    {
      image: "/file-manager.jpg",
      alt: "Secure File Manager",
      title: "Secure File Manager",
      category: "Security & Encryption"
    },
    {
      image: "/negai-design.jpg",
      alt: "NEGAI Library Design",
      title: "NEGAI Library System",
      category: "UI/UX Design & Prototyping"
    },
    {
      image: "/portfolio-overview.jpg",
      alt: "Portfolio Overview",
      title: "Portfolio Website",
      category: "Full Stack Development"
    }
  ]
}

export default portfolioData
