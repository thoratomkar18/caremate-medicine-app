import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Shield, 
  Clock, 
  AlertTriangle,
  Camera,
  Upload
} from 'lucide-react'
import { apiClient } from '../services/api'
import ProductCard from '../components/ProductCard'
import { useCart } from '../hooks/useCart'

const PrescriptionMedicines = () => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => apiClient.getProducts(),
  })

  // Filter prescription medicines (for demo, we'll use all products)
  const prescriptionProducts = products.filter(product => 
    product.name.toLowerCase().includes('biofer') || 
    product.name.toLowerCase().includes('vitafol') ||
    product.name.toLowerCase().includes('multilac')
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

  const features = [
    {
      icon: Shield,
      title: '100% Authentic',
      description: 'Only genuine medicines from licensed manufacturers'
    },
    {
      icon: FileText,
      title: 'Easy Upload',
      description: 'Upload prescription photo or scan directly'
    },
    {
      icon: Clock,
      title: 'Quick Delivery',
      description: 'Same-day delivery for urgent prescriptions'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-muted-900 mb-2">Prescription Medicines</h1>
        <p className="text-muted-600">
          Upload your prescription and get genuine medicines delivered to your door
        </p>
      </motion.div>

      {/* Prescription Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 mb-8 border border-primary-200"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-primary-900 mb-4">
            Order with Prescription
          </h2>
          <p className="text-primary-700 mb-6 max-w-2xl mx-auto">
            Upload a photo of your prescription and our pharmacists will verify and process your order
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
              <Camera className="w-5 h-5" />
              <span>Take Photo</span>
            </button>
            <button className="flex items-center space-x-2 bg-white text-primary-600 border border-primary-300 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors">
              <Upload className="w-5 h-5" />
              <span>Upload File</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-muted-200">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-muted-900 mb-2">{feature.title}</h3>
            <p className="text-muted-600">{feature.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Important Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-8"
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-warning-900 font-medium mb-1">Important Notice</h3>
            <p className="text-warning-800 text-sm">
              Prescription medicines require a valid prescription from a registered medical practitioner. 
              Our pharmacists will verify your prescription before processing the order.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Available Prescription Medicines */}
      {prescriptionProducts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-muted-900 mb-6">
            Popular Prescription Medicines
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {prescriptionProducts.map((product, index) => {
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

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-8 border border-muted-200"
      >
        <h2 className="text-2xl font-bold text-muted-900 mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: 1,
              title: 'Upload Prescription',
              description: 'Take a photo or upload your prescription'
            },
            {
              step: 2,
              title: 'Verification',
              description: 'Our pharmacists verify your prescription'
            },
            {
              step: 3,
              title: 'Order Confirmation',
              description: 'We confirm your order and pricing'
            },
            {
              step: 4,
              title: 'Delivery',
              description: 'Medicines delivered to your address'
            }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-muted-900 mb-2">{item.title}</h3>
              <p className="text-sm text-muted-600">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center bg-muted-50 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-muted-900 mb-2">Need Help?</h3>
        <p className="text-muted-600 mb-4">
          Our pharmacy experts are available 24/7 to assist you
        </p>
        <button
          onClick={() => navigate('/help')}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Contact Pharmacist
        </button>
      </motion.div>
    </div>
  )
}

export default PrescriptionMedicines