import { motion } from 'framer-motion'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/about' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '/#contact' },
    ],
    services: [
      { name: 'Brand Enhancement', href: '/services' },
      { name: 'Media Monitoring', href: '/services' },
      { name: 'Crisis Management', href: '/services' },
      { name: 'Newswire Services', href: '/services' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Media Coverage', href: '/media' },
      { name: 'Case Studies', href: '/blog' },
      { name: 'Industry Insights', href: '/blog' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
  ]

  return (
      <footer className="bg-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
            >
              <h3 className="text-3xl font-display font-bold mb-6">
                PR<span className="text-accent-500">Agency</span>
              </h3>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Your trusted partner in strategic public relations. We deliver comprehensive PR solutions that elevate brands, manage reputations, and drive measurable results.
              </p>

              <div className="space-y-4 mb-6">
                <a href="tel:+15551234567" className="flex items-center text-neutral-300 hover:text-accent-500 transition-colors group">
                  <div className="w-10 h-10 bg-primary-800 rounded-lg flex items-center justify-center mr-3 group-hover:bg-accent-600 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </a>
                <a href="mailto:hello@pragency.com" className="flex items-center text-neutral-300 hover:text-accent-500 transition-colors group">
                  <div className="w-10 h-10 bg-primary-800 rounded-lg flex items-center justify-center mr-3 group-hover:bg-accent-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>hello@pragency.com</span>
                </a>
                <div className="flex items-start text-neutral-300">
                  <div className="w-10 h-10 bg-primary-800 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span>123 PR Street, New York, NY 10001</span>
                </div>
              </div>

              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                      <motion.a
                          key={social.label}
                          href={social.href}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-10 h-10 bg-primary-800 rounded-lg flex items-center justify-center ${social.color} transition-all`}
                          aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-white font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                          to={link.href}
                          className="text-neutral-300 hover:text-accent-500 transition-colors flex items-center group"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="group-hover:translate-x-2 transition-transform">{link.name}</span>
                      </Link>
                    </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-white font-bold text-lg mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <Link
                          to={link.href}
                          className="text-neutral-300 hover:text-accent-500 transition-colors flex items-center group"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="group-hover:translate-x-2 transition-transform">{link.name}</span>
                      </Link>
                    </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-white font-bold text-lg mb-6">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <Link
                          to={link.href}
                          className="text-neutral-300 hover:text-accent-500 transition-colors flex items-center group"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="group-hover:translate-x-2 transition-transform">{link.name}</span>
                      </Link>
                    </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-primary-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div>
                <h4 className="text-white font-bold text-lg mb-2">Stay Updated</h4>
                <p className="text-neutral-300 text-sm">Subscribe to our newsletter for the latest PR insights and industry trends.</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 md:w-80 px-4 py-3 rounded-lg bg-primary-800 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-accent-600 text-white rounded-lg font-semibold hover:bg-accent-700 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-primary-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <p className="text-neutral-400 text-sm text-center md:text-left">
                © {currentYear} PR Agency. All rights reserved. | Crafted with excellence.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-neutral-400 hover:text-accent-500 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-neutral-400 hover:text-accent-500 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-neutral-400 hover:text-accent-500 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
  )
}

export default Footer