import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { mediaAPI } from '../services/api'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Media = () => {
  const [mediaItems, setMediaItems] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMediaItems()
    fetchCategories()
  }, [selectedCategory])

  const fetchMediaItems = async () => {
    try {
      setLoading(true)
      const params = { limit: 12 }
      if (selectedCategory !== 'all') {
        params.category = selectedCategory
      }

      const response = await mediaAPI.getAll(params)
      if (response.data.success) {
        setMediaItems(response.data.data)
      }
    } catch (err) {
      setError('Failed to load media coverage')
      console.error('Error fetching media items:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await mediaAPI.getCategories()
      if (response.data.success) {
        setCategories(['all', ...response.data.data])
      }
    } catch (err) {
      console.error('Error fetching categories:', err)
      setCategories(['all'])
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
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
            <title>Media Coverage - PR Agency</title>
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
          <title>Media Coverage - PR Agency</title>
          <meta
              name="description"
              content="Explore our media coverage and press mentions across various publications."
          />
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
                <h1 className="text-5xl font-bold mb-6">Media Coverage</h1>
                <p className="text-xl text-neutral-100 max-w-3xl mx-auto">
                  Explore our latest press mentions and media coverage across leading publications
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
                        onClick={() => handleCategoryChange(category)}
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

          <section className="py-20 bg-neutral-50">
            <div className="container mx-auto px-6">
              {error && (
                  <div className="text-center mb-8">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={fetchMediaItems}
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
                  {mediaItems.map((item, index) => (
                      <motion.div
                          key={item._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                          className="group"
                      >
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                          <div className="relative h-48 overflow-hidden">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                            />
                            <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                            {item.category}
                          </span>
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-neutral-500 uppercase">
                            {formatDate(item.publicationDate)}
                          </span>
                            </div>

                            <h3 className="text-xl font-bold text-primary-900 mb-3 line-clamp-2 group-hover:text-accent-600 transition-colors">
                              {item.title}
                            </h3>

                            <p className="text-neutral-600 text-sm line-clamp-2 mb-4">
                              {item.description}
                            </p>

                            <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-neutral-700">
                            {item.publicationName}
                          </span>

                              <a
                                  href={item.externalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary-600 font-semibold hover:text-accent-600 transition-colors text-sm"
                              >
                                Read More →
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {mediaItems.length === 0 && !error && (
                  <div className="text-center py-12">
                    <p className="text-neutral-500 text-lg">No media coverage found for this category.</p>
                  </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </>
  )
}

export default Media