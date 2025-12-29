import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Award, Users, CheckCircle } from 'lucide-react'

const Hero = () => {
  const stats = [
    { number: '250+', label: 'Brands Served', icon: Award },
    { number: '1000+', label: 'Campaigns Launched', icon: TrendingUp },
    { number: '120+', label: 'PR Professionals', icon: Users },
    { number: '98%', label: 'Client Satisfaction', icon: CheckCircle },
  ]

  return (
      <section id="home" className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDMuMzE0LTIuNjg2IDYtNiA2cy02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-20 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-white"
              >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                >
                  <Award className="w-4 h-4 mr-2 text-accent-500" />
                  <span className="text-sm font-semibold">Award-Winning PR Agency</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight"
                >
                  Strategic Public Relations
                  <br />
                  <span className="text-accent-500">That Delivers Results</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-xl lg:text-2xl text-neutral-100 mb-8 leading-relaxed"
                >
                  Elevate your brand with data-driven PR strategies, comprehensive media monitoring, and nationwide reach across 300+ districts.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mb-8 space-y-3"
                >
                  {[
                    'Real-time media monitoring across 450+ publications',
                    'Daily reports delivered by 8:30 AM',
                    'Pan-India coverage with regional expertise',
                    'Crisis management & reputation protection'
                  ].map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-accent-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-neutral-100">{benefit}</span>
                      </div>
                  ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
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
                      href="#services"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-lg font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30"
                  >
                    Explore Services
                  </motion.a>
                </motion.div>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="grid grid-cols-2 gap-6"
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                      <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all"
                      >
                        <div className="inline-flex p-3 mb-4 rounded-lg bg-accent-500/20 text-accent-500">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-4xl font-bold text-white mb-2">
                          {stat.number}
                        </div>
                        <div className="text-neutral-200 font-medium">
                          {stat.label}
                        </div>
                      </motion.div>
                  )
                })}
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

export default Hero