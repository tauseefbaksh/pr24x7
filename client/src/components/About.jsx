import { motion } from 'framer-motion'
import { Award, Users, Target, Zap, TrendingUp, Globe, Shield, CheckCircle } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Multiple awards for excellence in public relations and strategic communications',
      color: 'from-accent-600 to-accent-700'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: '120+ PR professionals with deep industry expertise and media connections',
      color: 'from-primary-600 to-primary-700'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: '98% client satisfaction rate with measurable campaign outcomes',
      color: 'from-accent-600 to-accent-700'
    },
    {
      icon: Zap,
      title: 'Rapid Response',
      description: '24/7 crisis management with real-time media monitoring and alerts',
      color: 'from-primary-600 to-primary-700'
    },
  ]

  const stats = [
    { number: '10+', label: 'Years of Excellence' },
    { number: '250+', label: 'Brands Served' },
    { number: '1000+', label: 'Successful Campaigns' },
    { number: '300+', label: 'Districts Covered' },
  ]

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our communications and relationships.'
    },
    {
      icon: TrendingUp,
      title: 'Excellence',
      description: 'We strive for exceptional quality in every campaign and client interaction.'
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'We leverage cutting-edge tools and strategies to stay ahead of industry trends.'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We build lasting relationships based on trust, transparency, and mutual success.'
    },
  ]

  return (
      <section id="about" className="py-24 bg-gradient-to-b from-white via-neutral-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary-600 bg-primary-50 rounded-full border border-primary-200">
              About PR Agency
            </span>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-primary-900 mb-6">
                Building Brands Through
                <br />
                <span className="text-accent-600">Strategic Communication</span>
              </h2>
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                Since 2014, PR Agency has been at the forefront of strategic public relations in India. We combine deep industry expertise with cutting-edge technology to deliver comprehensive PR solutions that drive real business results.
              </p>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                Our team of 120+ PR professionals brings unmatched media connections, regional expertise, and a commitment to excellence that has earned the trust of 250+ leading brands across diverse industries.
              </p>

              <div className="space-y-3">
                {[
                  'Pan-India reach across 300+ districts',
                  'Real-time monitoring of 450+ publications',
                  'Daily reports delivered by 8:30 AM',
                  '24/7 crisis management support'
                ].map((highlight, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                    >
                      <CheckCircle className="w-6 h-6 text-accent-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700 font-medium">{highlight}</span>
                    </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-neutral-200"
                    >
                      <div className={`inline-flex p-3 mb-4 rounded-lg bg-gradient-to-br ${feature.color} text-white shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-primary-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {feature.description}
                      </p>
                    </motion.div>
                )
              })}
            </motion.div>
          </div>

          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-24"
          >
            <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDMuMzE0LTIuNjg2IDYtNiA2cy02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')]"></div>
              </div>

              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center"
                    >
                      <div className="text-5xl sm:text-6xl font-bold text-accent-500 mb-3">
                        {stat.number}
                      </div>
                      <div className="text-white font-medium text-lg">{stat.label}</div>
                    </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary-600 bg-primary-50 rounded-full border border-primary-200">
              Our Core Values
            </span>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-primary-900 mb-4">
                What Drives Us Forward
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Our values guide every decision we make and every campaign we execute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                    <motion.div
                        key={value.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-neutral-200 text-center"
                    >
                      <div className="inline-flex p-4 mb-4 rounded-xl bg-primary-100 text-primary-600">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-primary-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-neutral-600">
                        {value.description}
                      </p>
                    </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>
  )
}

export default About