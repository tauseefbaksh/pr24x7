import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail } from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Media', href: '/media' },
    { name: 'Blog', href: '/blog' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/#contact' },
  ]

  return (
      <>
        {/* Top bar */}
        <div className="bg-primary-900 text-white py-2 hidden lg:block">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-6">
                <a href="tel:+15551234567" className="flex items-center hover:text-accent-500 transition-colors">
                  <Phone className="w-4 h-4 mr-2" />
                  +1 (555) 123-4567
                </a>
                <a href="mailto:hello@pragency.com" className="flex items-center hover:text-accent-500 transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  hello@pragency.com
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:text-accent-500 transition-colors">
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-lg' : 'bg-white'
            }`}
            style={{ top: isScrolled ? '0' : '40px' }}
        >
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0"
              >
                <Link to="/" className="flex items-center">
                <span className="text-2xl font-display font-bold text-primary-900">
                  PR<span className="text-accent-600">Agency</span>
                </span>
                </Link>
              </motion.div>

              {/* Desktop nav */}
              <div className="hidden lg:flex items-center space-x-8">
                {navItems.map((item, index) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -2 }}
                    >
                      {item.href.startsWith('/') && !item.href.includes('#') ? (
                          <Link
                              to={item.href}
                              className={`text-base font-semibold transition-colors relative group ${
                                  location.pathname === item.href
                                      ? 'text-primary-900'
                                      : 'text-neutral-700 hover:text-primary-900'
                              }`}
                          >
                            {item.name}
                            <span
                                className={`absolute bottom-0 left-0 h-0.5 bg-accent-600 transition-all duration-300 ${
                                    location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}
                            ></span>
                          </Link>
                      ) : (
                          <a
                              href={item.href}
                              className="text-base font-semibold text-neutral-700 hover:text-primary-900 transition-colors relative group"
                          >
                            {item.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-600 transition-all group-hover:w-full"></span>
                          </a>
                      )}
                    </motion.div>
                ))}

                <motion.a
                    href="/#contact"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-accent-600 text-white rounded-lg font-semibold hover:bg-accent-700 transition-all shadow-md hover:shadow-lg"
                >
                  Get Started
                </motion.a>
              </div>

              {/* Mobile menu button */}
              <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 text-primary-900 hover:text-accent-600 transition-colors"
                  aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile nav */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                  <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="lg:hidden overflow-hidden bg-white border-t border-neutral-200"
                  >
                    <div className="py-4 space-y-4">
                      {navItems.map((item) =>
                          item.href.startsWith('/') && !item.href.includes('#') ? (
                              <Link
                                  key={item.name}
                                  to={item.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={`block text-base font-semibold py-2 transition-colors ${
                                      location.pathname === item.href
                                          ? 'text-primary-900 bg-primary-50'
                                          : 'text-neutral-700 hover:text-primary-900 hover:bg-neutral-50'
                                  } px-4 rounded-lg`}
                              >
                                {item.name}
                              </Link>
                          ) : (
                              <a
                                  key={item.name}
                                  href={item.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block text-base font-semibold text-neutral-700 hover:text-primary-900 hover:bg-neutral-50 py-2 px-4 rounded-lg transition-colors"
                              >
                                {item.name}
                              </a>
                          )
                      )}

                      <div className="pt-4 border-t border-neutral-200 space-y-2 px-4">
                        <a href="tel:+15551234567" className="flex items-center text-neutral-700 hover:text-primary-900">
                          <Phone className="w-4 h-4 mr-2" />
                          +1 (555) 123-4567
                        </a>
                        <a href="mailto:hello@pragency.com" className="flex items-center text-neutral-700 hover:text-primary-900">
                          <Mail className="w-4 h-4 mr-2" />
                          hello@pragency.com
                        </a>
                      </div>

                      <a
                          href="/#contact"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-6 py-3 mx-4 bg-accent-600 text-white rounded-lg font-semibold hover:bg-accent-700 transition-colors text-center"
                      >
                        Get Started
                      </a>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </motion.header>

        {/* Spacer to offset fixed header */}
        <div style={{ height: isScrolled ? '80px' : '120px' }}></div>
      </>
  )
}

export default Header
