import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Megaphone,
  Shield,
  Globe,
  TrendingUp,
  Users,
  FileText,
  Zap,
  ArrowRight
} from 'lucide-react'

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const services = [
    {
      icon: TrendingUp,
      title: 'Brand Enhancement',
      description: 'Strategic brand positioning and reputation management to establish your brand as an industry leader with compelling narratives.',
      color: 'from-primary-600 to-primary-700',
      delay: 0,
      slug: 'brand-management',
    },
    {
      icon: Globe,
      title: 'Media Monitoring',
      description: 'Comprehensive tracking across 450+ publications with real-time alerts and daily reports delivered by 8:30 AM.',
      color: 'from-accent-600 to-accent-700',
      delay: 0.1,
      slug: 'media-relations',
    },
    {
      icon: Shield,
      title: 'Crisis Communication',
      description: 'Rapid response protocols and reputation protection strategies to navigate challenging situations effectively.',
      color: 'from-primary-700 to-primary-800',
      delay: 0.2,
      slug: 'crisis-management',
    },
    {
      icon: Megaphone,
      title: 'Newswire Services',
      description: 'Pan-India press release distribution to 300+ districts with targeted media placement and tracking.',
      color: 'from-accent-600 to-accent-700',
      delay: 0.3,
      slug: 'digital-pr',
    },
    {
      icon: Users,
      title: 'Events & Expo',
      description: 'End-to-end event management, media coordination, and post-event coverage to maximize visibility.',
      color: 'from-primary-600 to-primary-700',
      delay: 0.4,
      slug: 'strategic-communications',
    },
    {
      icon: FileText,
      title: 'Content & Translation',
      description: 'Professional content creation and multi-language translation services for pan-India reach.',
      color: 'from-accent-600 to-accent-700',
      delay: 0.5,
      slug: 'content-creation',
    },
    {
      icon: Zap,
      title: 'Influencer Outreach',
      description: 'Strategic partnerships with influencers and thought leaders to amplify your brand message.',
      color: 'from-primary-700 to-primary-800',
      delay: 0.6,
      slug: 'digital-pr',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  return (
      <section id="services" ref={ref} className="py-24 bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
          >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary-600 bg-primary-50 rounded-full border border-primary-200">
            Our Core Services
          </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-900 mb-6">
              Comprehensive PR Solutions
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              From brand enhancement to crisis management, we offer a full spectrum of public relations services tailored to your business needs.
            </p>
          </motion.div>

          <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                  <motion.div
                      key={service.title}
                      variants={itemVariants}
                      whileHover={{
                        y: -12,
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      }}
                      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200 overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                    <div className="relative p-8">
                      <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className={`inline-flex p-4 mb-6 rounded-xl bg-gradient-to-br ${service.color} text-white shadow-lg group-hover:shadow-xl`}
                      >
                        <Icon className="w-7 h-7" />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-primary-900 mb-4 group-hover:text-accent-600 transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-neutral-600 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center text-primary-600 font-semibold hover:text-accent-600 transition-colors group/link"
                      >
                        Learn More
                        <ArrowRight className="ml-2 w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                      </Link>
                    </div>

                    <div className={`h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                  </motion.div>
              )
            })}
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 text-center"
          >
            <p className="text-lg text-neutral-600 mb-6">
              Can't find what you're looking for? We offer customized PR solutions.
            </p>
            <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-primary-900 text-white rounded-lg font-bold text-lg hover:bg-primary-800 transition-colors shadow-lg hover:shadow-xl"
            >
              Discuss Your Needs
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
  )
}

export default Services