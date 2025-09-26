import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Activity, Thermometer, Heart } from 'lucide-react'
import { apiClient } from '../services/api'
import ProductCard from '../components/ProductCard'
import { useCart } from '../hooks/useCart'

const HealthDevices = () => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => apiClient.getProducts(),
  })

  const healthDevices = products.filter(product => 
    product.category === 'Medical Devices'
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-muted-900 mb-2">Health Devices</h1>
        <p className="text-muted-600">
          Monitor your health at home with our range of medical devices
        </p>
      </motion.div>

      {/* Featured Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="bg-white rounded-xl p-6 border border-muted-200">
          <Activity className="w-12 h-12 text-primary-600 mb-4" />
          <h3 className="text-lg font-semibold text-muted-900 mb-2">Blood Pressure Monitors</h3>
          <p className="text-muted-600">Digital BP monitors for accurate home monitoring</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-muted-200">
          <Thermometer className="w-12 h-12 text-error-600 mb-4" />
          <h3 className="text-lg font-semibold text-muted-900 mb-2">Thermometers</h3>
          <p className="text-muted-600">Digital and infrared thermometers for quick readings</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-muted-200">
          <Heart className="w-12 h-12 text-success-600 mb-4" />
          <h3 className="text-lg font-semibold text-muted-900 mb-2">Health Monitors</h3>
          <p className="text-muted-600">Pulse oximeters and other monitoring devices</p>
        </div>
      </motion.div>

      {/* Products */}
      {healthDevices.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-muted-900 mb-6">Available Devices</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {healthDevices.map((product, index) => {
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
        </motion.section>
      )}
    </div>
  )
}

export default HealthDevices