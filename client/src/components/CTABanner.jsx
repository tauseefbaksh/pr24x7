import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Phone, Mail, Award, TrendingUp } from 'lucide-react'

const CTABanner = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { icon: Award, value: '250+', label: 'Brands Trust Us' },
    { icon: TrendingUp, value: '98%', label: 'Success Rate' },
  ]

  return (
      <section ref={ref} className="relative py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDMuMzE0LTIuNjg2IDYtNiA2cy02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-20 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-1/4 left-20 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                  Ready to Transform Your Brand Story?
                </h2>
                <p className="text-xl text-neutral-100 mb-8 leading-relaxed">
                  Partner with industry-leading PR professionals who deliver measurable results. Let's discuss how we can elevate your brand presence.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center px-8 py-4 bg-accent-600 text-white rounded-lg font-bold text-lg hover:bg-accent-700 transition-all shadow-xl hover:shadow-2xl group"
                  >
                    Start Your Campaign
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                  <motion.a
                      href="tel:+15551234567"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-lg font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    Call Now
                  </motion.a>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-6 text-neutral-100"
                >
                  <a
                      href="mailto:hello@pragency.com"
                      className="flex items-center hover:text-accent-500 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mr-3 group-hover:bg-accent-600 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="font-medium">hello@pragency.com</span>
                  </a>

                  <a
                      href="tel:+15551234567"
                      className="flex items-center hover:text-accent-500 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mr-3 group-hover:bg-accent-600 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="font-medium">+1 (555) 123-4567</span>
                  </a>
                </motion.div>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                      <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all"
                      >
                        <div className="inline-flex p-3 mb-4 rounded-lg bg-accent-500/20 text-accent-500">
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="text-5xl font-bold text-white mb-2">
                          {stat.value}
                        </div>
                        <div className="text-neutral-200 font-medium text-lg">
                          {stat.label}
                        </div>
                      </motion.div>
                  )
                })}

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 }}
                    className="sm:col-span-2 bg-gradient-to-br from-accent-600 to-accent-700 p-8 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold text-2xl mb-2">
                        Award-Winning Team
                      </div>
                      <div className="text-accent-100">
                        Recognized industry experts with 10+ years of excellence
                      </div>
                    </div>
                    <Award className="w-16 h-16 text-white opacity-50" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-auto" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="white"/>
          </svg>
        </div>
      </section>
  )
}

export default CTABanner