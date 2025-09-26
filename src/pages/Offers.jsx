import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Percent, Gift, Clock, Star } from 'lucide-react'
import { apiClient } from '../services/api'
import ProductCard from '../components/ProductCard'
import { useCart } from '../hooks/useCart'

const Offers = () => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => apiClient.getProducts(),
  })

  // Filter products with discounts
  const discountedProducts = products.filter(product => 
    product.originalPrice && product.originalPrice > product.price
  )

  const handleAddToCart = (product) => {
    addToCart(product, 1)
  }

  const handleViewDetails = (product) => {
    navigate(`/products/${product.id}`)
  }

  const handleBuyNow = (product) => {
    addToCart(product, 1)
    navigate('/checkout')
  }

  const getDiscountPercentage = (product) => {
    if (!product.originalPrice) return 0
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-muted-900 mb-2">Special Offers</h1>
        <p className="text-muted-600">
          Save more on your health and wellness products
        </p>
      </motion.div>

      {/* Current Offers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        <div className="bg-gradient-to-r from-success-500 to-success-600 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Percent className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">HEALTH20</h3>
              <p className="text-success-100">20% Off on Vitamins</p>
            </div>
          </div>
          <p className="text-sm text-success-100 mb-4">
            Get 20% discount on all vitamin and supplement products
          </p>
          <div className="flex items-center space-x-2 text-xs">
            <Clock className="w-4 h-4" />
            <span>Valid until end of month</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Gift className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">FREE500</h3>
              <p className="text-primary-100">Free Delivery</p>
            </div>
          </div>
          <p className="text-sm text-primary-100 mb-4">
            Free delivery on orders above ₹500
          </p>
          <div className="flex items-center space-x-2 text-xs">
            <Star className="w-4 h-4" />
            <span>Always Available</span>
          </div>
        </div>
      </motion.div>

      {/* Discounted Products */}
      {discountedProducts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-muted-900 mb-6">Products on Sale</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {discountedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -top-2 -right-2 bg-error-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  {getDiscountPercentage(product)}% OFF
                </div>
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                  onBuyNow={handleBuyNow}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-8 text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Never Miss an Offer!</h2>
        <p className="text-lg opacity-90 mb-6">
          Subscribe to get exclusive deals and discounts delivered to your inbox
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-muted-900 focus:outline-none focus:ring-2 focus:ring-accent-300"
          />
          <button className="bg-white text-accent-600 px-6 py-3 rounded-lg font-semibold hover:bg-accent-50 transition-colors">
            Subscribe
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Offers