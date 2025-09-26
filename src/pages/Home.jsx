import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Shield, 
  Truck, 
  Clock, 
  Star,
  Heart,
  Zap,
  Package
} from 'lucide-react'
import { apiClient } from '../services/api'
import ProductCard from '../components/ProductCard'
import { useCart } from '../hooks/useCart'

const Home = () => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 640)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiClient.getCategories(),
  })

  // Categories loaded successfully

  const { data: featuredProducts = [] } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => apiClient.getFeaturedProducts(),
  })

  const { data: popularProducts = [] } = useQuery({
    queryKey: ['popular-products'],
    queryFn: () => apiClient.getPopularProducts(),
  })

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product)
    addToCart(product, 1)
  }

  const handleViewDetails = (product) => {
    navigate(`/products/${product.id}`)
  }

  const handleBuyNow = (product) => {
    addToCart(product, 1)
    navigate('/checkout')
  }

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category.name)}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 mb-8 text-white overflow-hidden"
      >
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Your Health, Our Priority
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            Order medicines and health products with confidence. Fast delivery, genuine products.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">100% Genuine</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5" />
              <span className="text-sm">Free Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </motion.div>

      {/* Categories */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-muted-900">Categories</h2>
          <button 
            onClick={() => navigate('/categories')}
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-2 sm:gap-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCategoryClick(category)}
              className="card-hover text-center p-4 cursor-pointer"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="text-sm font-medium text-muted-900 line-clamp-2">
                {category.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Discount Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-success-500 to-success-600 rounded-xl p-6 mb-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">🎉 Special Offer!</h3>
            <p className="opacity-90">Get 20% off on all vitamins and supplements</p>
            <p className="text-sm opacity-75 mt-1">Use code: HEALTH20</p>
          </div>
          <div className="hidden md:block">
            <Zap className="w-16 h-16 opacity-20" />
          </div>
        </div>
      </motion.div>

      {/* Featured Products */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-muted-900">Featured Products</h2>
          <button 
            onClick={() => navigate('/products')}
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(isMobile ? featuredProducts.slice(0, 4) : featuredProducts).map((product, index) => {
            const discountPercentage = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {discountPercentage > 0 && (
                  <div className="absolute -top-2 -right-2 bg-error-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    {discountPercentage}% OFF
                  </div>
                )}
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                  onBuyNow={handleBuyNow}
                />
              </motion.div>
            )
          })}
        </div>
        {isMobile && featuredProducts.length > 4 && (
          <div className="text-center mt-4">
            <button 
              onClick={() => navigate('/products?featured=true')}
              className="btn-outline text-sm px-6 py-2"
            >
              View All Featured Products ({featuredProducts.length})
            </button>
          </div>
        )}
      </motion.section>

      {/* Popular Products */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Star className="w-6 h-6 text-warning-500" />
            <h2 className="text-2xl font-bold text-muted-900">Popular Items</h2>
          </div>
          <button 
            onClick={() => window.location.href = '/products?sort=popular'}
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(isMobile ? popularProducts.slice(0, 4) : popularProducts).map((product, index) => {
            const discountPercentage = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {discountPercentage > 0 && (
                  <div className="absolute -top-2 -right-2 bg-error-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    {discountPercentage}% OFF
                  </div>
                )}
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                  onBuyNow={handleBuyNow}
                />
              </motion.div>
            )
          })}
        </div>
        {isMobile && popularProducts.length > 4 && (
          <div className="text-center mt-4">
            <button 
              onClick={() => navigate('/products?sort=popular')}
              className="btn-outline text-sm px-6 py-2"
            >
              View All Popular Products ({popularProducts.length})
            </button>
          </div>
        )}
      </motion.section>

      {/* Health Tips Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-muted-100 rounded-xl p-6 mb-8"
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-muted-900 mb-2">
              Health Tip of the Day
            </h3>
            <p className="text-muted-600 mb-3">
              Stay hydrated! Drink at least 8 glasses of water daily to maintain proper body function and boost your immune system.
            </p>
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              Read More Health Tips →
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="font-semibold text-muted-900 mb-2">Order Medicines</h3>
          <p className="text-sm text-muted-600 mb-4">Browse our extensive range of prescription and OTC medicines</p>
          <button 
            onClick={() => navigate('/products')}
            className="btn-outline text-sm"
          >
            Shop Now
          </button>
        </div>
        
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="w-6 h-6 text-success-600" />
          </div>
          <h3 className="font-semibold text-muted-900 mb-2">Track Orders</h3>
          <p className="text-sm text-muted-600 mb-4">Monitor your order status and delivery updates in real-time</p>
          <button 
            onClick={() => navigate('/orders')}
            className="btn-outline text-sm"
          >
            Track Now
          </button>
        </div>
        
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-accent-600" />
          </div>
          <h3 className="font-semibold text-muted-900 mb-2">Health Articles</h3>
          <p className="text-sm text-muted-600 mb-4">Read expert health tips and wellness advice</p>
          <button 
            onClick={() => navigate('/articles')}
            className="btn-outline text-sm"
          >
            Read Articles
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Home
