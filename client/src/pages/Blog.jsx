import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { blogAPI } from '../services/api'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlogs()
    fetchCategories()
  }, [selectedCategory])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const params = { limit: 9 }
      if (selectedCategory !== 'all') {
        params.category = selectedCategory
      }

      const response = await blogAPI.getAll(params)
      if (response.data.success) {
        setBlogs(response.data.data)
      }
    } catch (err) {
      setError('Failed to load blog posts')
      console.error('Error fetching blogs:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await blogAPI.getCategories()
      if (response.data.success) {
        setCategories(['all', ...response.data.data])
      }
    } catch (err) {
      console.error('Error fetching categories:', err)
      setCategories(['all'])
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
        <>
          <Helmet>
            <title>Blog - PR Agency</title>
          </Helmet>
          <Header />
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
          <Footer />
        </>
    )
  }

  return (
      <>
        <Helmet>
          <title>Blog - PR Agency</title>
          <meta name="description" content="Read our latest insights on PR strategies, digital marketing, and industry trends." />
        </Helmet>

        <Header />

        <main className="pt-20">
          <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-20">
            <div className="container mx-auto px-6">
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
              >
                <h1 className="text-5xl font-bold mb-6">Blog</h1>
                <p className="text-xl text-neutral-100 max-w-3xl mx-auto">
                  Insights, strategies, and trends shaping the world of public relations
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-8 bg-white border-b border-neutral-200">
            <div className="container mx-auto px-6">
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                    <motion.button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${
                            selectedCategory === category
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </motion.button>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              {error && (
                  <div className="text-center mb-8">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={fetchBlogs}
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Try Again
                    </button>
                  </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {blogs.map((blog, index) => (
                      <motion.div
                          key={blog._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                          className="group"
                      >
                        <Link to={`/blog/${blog.slug}`}>
                          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                              <img
                                  src={blog.image}
                                  alt={blog.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  loading="lazy"
                              />
                            </div>

                            <div className="p-6">
                              <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-primary-600 font-medium">
                              {blog.category}
                            </span>
                                <span className="text-sm text-neutral-500">
                              {blog.readTime} min read
                            </span>
                              </div>

                              <h3 className="text-xl font-bold text-primary-900 mb-3 line-clamp-2 group-hover:text-accent-600 transition-colors">
                                {blog.title}
                              </h3>

                              <p className="text-neutral-600 line-clamp-3 mb-4">
                                {blog.excerpt}
                              </p>

                              <div className="flex items-center justify-between">
                            <span className="text-sm text-neutral-500">
                              {formatDate(blog.publishedAt)}
                            </span>
                                <span className="text-primary-600 font-semibold group-hover:text-accent-600 transition-colors">
                              Read More →
                            </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {blogs.length === 0 && !error && (
                  <div className="text-center py-12">
                    <p className="text-neutral-500 text-lg">No blog posts found for this category.</p>
                  </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </>
  )
}

export default Blog