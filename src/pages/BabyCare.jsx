import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Baby, Heart, Shield } from 'lucide-react'

const BabyCare = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-muted-900 mb-2">Baby Care</h1>
        <p className="text-muted-600">
          Everything you need for your little one's health and wellness
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="bg-white rounded-xl p-6 border border-muted-200">
          <Baby className="w-12 h-12 text-pink-600 mb-4" />
          <h3 className="text-lg font-semibold text-muted-900 mb-2">Baby Medicine</h3>
          <p className="text-muted-600">Safe and gentle medicines for babies</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-muted-200">
          <Heart className="w-12 h-12 text-red-600 mb-4" />
          <h3 className="text-lg font-semibold text-muted-900 mb-2">Health Products</h3>
          <p className="text-muted-600">Thermometers, monitors, and care products</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-muted-200">
          <Shield className="w-12 h-12 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold text-muted-900 mb-2">Safety Products</h3>
          <p className="text-muted-600">Baby-safe sanitizers and protection</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center bg-pink-50 rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-muted-900 mb-4">Coming Soon!</h2>
        <p className="text-muted-600 mb-6">
          We're carefully curating the best baby care products for your little ones.
        </p>
        <button
          onClick={() => navigate('/help')}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Contact Us for Baby Care Needs
        </button>
      </motion.div>
    </div>
  )
}

export default BabyCare