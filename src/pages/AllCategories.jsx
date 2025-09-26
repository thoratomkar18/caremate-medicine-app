import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowRight, Package, Users, TrendingUp } from 'lucide-react'
import { apiClient } from '../services/api'

const AllCategories = () => {
  const navigate = useNavigate()

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiClient.getCategories(),
  })

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => apiClient.getProducts(),
  })

  const getCategoryStats = (categoryName) => {
    const categoryProducts = products.filter(p => p.category === categoryName)
    return {
      productCount: categoryProducts.length,
      averageRating: categoryProducts.length > 0 
        ? (categoryProducts.reduce((sum, p) => sum + p.rating, 0) / categoryProducts.length).toFixed(1)
        : 0
    }
  }

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category.name)}`)
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-muted-200">
                <div className="h-16 bg-muted-200 rounded-full w-16 mx-auto mb-4"></div>
                <div className="h-4 bg-muted-200 rounded mb-2"></div>
                <div className="h-3 bg-muted-200 rounded w-2/3 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-muted-900 mb-2">All Categories</h1>
        <p className="text-muted-600">
          Explore our comprehensive range of health and wellness products
        </p>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-600">{categories.length}</h3>
              <p className="text-sm text-primary-700">Total Categories</p>
            </div>
          </div>
        </div>

        <div className="bg-success-50 rounded-xl p-6 border border-success-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-success-600">{products.length}+</h3>
              <p className="text-sm text-success-700">Products Available</p>
            </div>
          </div>
        </div>

        <div className="bg-warning-50 rounded-xl p-6 border border-warning-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-warning-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-warning-600">4.3+</h3>
              <p className="text-sm text-warning-700">Average Rating</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {categories.map((category, index) => {
          const stats = getCategoryStats(category.name)
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCategoryClick(category)}
              className="bg-white rounded-xl p-6 border border-muted-200 hover:shadow-lg hover:border-primary-300 transition-all duration-200 cursor-pointer group"
            >
              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-muted-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <div className="space-y-1 mb-4">
                  <p className="text-sm text-muted-600">
                    {stats.productCount} products
                  </p>
                  {stats.averageRating > 0 && (
                    <p className="text-sm text-warning-600">
                      ⭐ {stats.averageRating} rating
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-center text-primary-600 group-hover:text-primary-700 transition-colors">
                  <span className="text-sm font-medium">Browse</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h2>
        <p className="text-lg opacity-90 mb-6">
          Contact our pharmacy experts for personalized assistance
        </p>
        <button
          onClick={() => navigate('/help')}
          className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-muted-100 transition-colors"
        >
          Contact Support
        </button>
      </motion.div>
    </div>
  )
}

export default AllCategories