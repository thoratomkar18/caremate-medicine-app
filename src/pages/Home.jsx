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

// Fallback data in case MSW is not working
const fallbackCategories = [
  { id: 1, name: 'Vitamins & Supplements', icon: '💊' },
  { id: 2, name: 'Digestive Health', icon: '🫁' },
  { id: 3, name: 'Medical Devices', icon: '🩺' },
  { id: 4, name: 'Skin Care', icon: '🧴' },
  { id: 5, name: 'Pain Relief', icon: '💉' },
  { id: 7, name: 'Baby Care', icon: '👶' },
  { id: 8, name: 'Personal Care', icon: '🧼' },
  { id: 9, name: 'First Aid', icon: '🏥' },
  { id: 10, name: 'Eye Care', icon: '👁️' },
  { id: 11, name: 'Cough & Cold', icon: '🤧' }
]

const fallbackProducts = [
  {
    id: 1,
    name: 'Biofer-F',
    price: 50.13,
    originalPrice: 65.00,
    category: 'Vitamins & Supplements',
    image: 'images/biofer-f.svg',
    description: 'Iron supplement for improved hemoglobin levels',
    inStock: true,
    rating: 4.5,
    reviews: 128,
    manufacturer: 'Biofer Pharma'
  },
  {
    id: 2,
    name: 'VitaFol Multivitamins',
    price: 299.00,
    originalPrice: 350.00,
    category: 'Vitamins & Supplements',
    image: 'images/vitafol-multivitamins.svg',
    description: 'Complete multivitamin for daily nutrition',
    inStock: true,
    rating: 4.3,
    reviews: 89,
    manufacturer: 'VitaFol Health'
  },
  {
    id: 3,
    name: 'Zincovit-C',
    price: 201.41,
    originalPrice: 250.00,
    category: 'Vitamins & Supplements',
    image: 'images/zincovit-c.svg',
    description: 'Zinc and Vitamin C for immune support',
    inStock: true,
    rating: 4.4,
    reviews: 156,
    manufacturer: 'Zincovit Labs'
  },
  {
    id: 4,
    name: 'PhysiciansCare Antacid',
    price: 97.86,
    originalPrice: 120.00,
    category: 'Digestive Health',
    image: 'images/digestive-health.svg',
    description: 'Fast-acting antacid for heartburn relief',
    inStock: true,
    rating: 4.2,
    reviews: 203,
    manufacturer: 'PhysiciansCare'
  }
]

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

  const { data: categories = fallbackCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiClient.getCategories(),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const { data: featuredProducts = fallbackProducts.slice(0, 4) } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => apiClient.getFeaturedProducts(),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const { data: popularProducts = fallbackProducts.slice(0, 4) } = useQuery({
    queryKey: ['popular-products'],
    queryFn: () => apiClient.getPopularProducts(),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
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
    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-8 mb-8 overflow-hidden text-white bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl"
      >
        <div className="relative z-10">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            Your Health, Our Priority
          </h1>
          <p className="mb-6 text-lg md:text-xl opacity-90">
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
        <div className="absolute top-0 right-0 w-64 h-64 translate-x-32 -translate-y-32 rounded-full bg-white/10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 -translate-x-24 translate-y-24 rounded-full bg-white/5"></div>
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
            className="flex items-center space-x-1 font-medium text-primary-600 hover:text-primary-700"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 sm:gap-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCategoryClick(category)}
              className="p-4 text-center cursor-pointer card-hover"
            >
              <div className="mb-2 text-3xl">{category.icon}</div>
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
        className="p-6 mb-8 text-white bg-gradient-to-r from-success-500 to-success-600 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="mb-2 text-xl font-bold">🎉 Special Offer!</h3>
            <p className="opacity-90">Get 20% off on all vitamins and supplements</p>
            <p className="mt-1 text-sm opacity-75">Use code: HEALTH20</p>
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
            className="flex items-center space-x-1 font-medium text-primary-600 hover:text-primary-700"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
                  <div className="absolute z-10 px-2 py-1 text-xs font-bold text-white rounded-full -top-2 -right-2 bg-error-500">
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
          <div className="mt-4 text-center">
            <button 
              onClick={() => navigate('/products?featured=true')}
              className="px-6 py-2 text-sm btn-outline"
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
            className="flex items-center space-x-1 font-medium text-primary-600 hover:text-primary-700"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
                  <div className="absolute z-10 px-2 py-1 text-xs font-bold text-white rounded-full -top-2 -right-2 bg-error-500">
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
          <div className="mt-4 text-center">
            <button 
              onClick={() => navigate('/products?sort=popular')}
              className="px-6 py-2 text-sm btn-outline"
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
        className="p-6 mb-8 bg-muted-100 rounded-xl"
      >
        <div className="flex items-start space-x-4">
          <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-primary-100">
            <Heart className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-muted-900">
              Health Tip of the Day
            </h3>
            <p className="mb-3 text-muted-600">
              Stay hydrated! Drink at least 8 glasses of water daily to maintain proper body function and boost your immune system.
            </p>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
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
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        <div className="p-6 text-center card">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-primary-100">
            <Package className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="mb-2 font-semibold text-muted-900">Order Medicines</h3>
          <p className="mb-4 text-sm text-muted-600">Browse our extensive range of prescription and OTC medicines</p>
          <button 
            onClick={() => navigate('/products')}
            className="text-sm btn-outline"
          >
            Shop Now
          </button>
        </div>
        
        <div className="p-6 text-center card">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-success-100">
            <Truck className="w-6 h-6 text-success-600" />
          </div>
          <h3 className="mb-2 font-semibold text-muted-900">Track Orders</h3>
          <p className="mb-4 text-sm text-muted-600">Monitor your order status and delivery updates in real-time</p>
          <button 
            onClick={() => navigate('/orders')}
            className="text-sm btn-outline"
          >
            Track Now
          </button>
        </div>
        
        <div className="p-6 text-center card">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-accent-100">
            <Heart className="w-6 h-6 text-accent-600" />
          </div>
          <h3 className="mb-2 font-semibold text-muted-900">Health Articles</h3>
          <p className="mb-4 text-sm text-muted-600">Read expert health tips and wellness advice</p>
          <button 
            onClick={() => navigate('/articles')}
            className="text-sm btn-outline"
          >
            Read Articles
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Home
