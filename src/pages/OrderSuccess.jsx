import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  Package,
  MapPin,
  Clock,
  ArrowRight,
  Home,
  FileText,
  Truck
} from 'lucide-react'
import { apiClient } from '../services/api'
import Button from '../components/Button'

const OrderSuccess = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => apiClient.getOrder(id),
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Package className="w-16 h-16 text-error-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-muted-900 mb-2">Order not found</h2>
          <p className="text-muted-600 mb-6">The order you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => navigate('/orders')}>
            View All Orders
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-12 h-12 text-success-600" />
        </div>
        <h1 className="text-3xl font-bold text-muted-900 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-muted-600 text-lg">
          Thank you for your order. We&apos;ll send you updates on your order status.
        </p>
      </motion.div>

      {/* Order Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-muted-200 p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-muted-900">Order Details</h2>
          <span className="text-sm text-muted-500">Order #{order.id}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Order Info */}
          <div>
            <h3 className="font-medium text-muted-900 mb-3">Order Information</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 text-muted-500 mr-2" />
                <span className="text-muted-600">Ordered on:</span>
                <span className="ml-2 font-medium text-muted-900">
                  {formatDate(order.date)}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Package className="w-4 h-4 text-muted-500 mr-2" />
                <span className="text-muted-600">Status:</span>
                <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <h3 className="font-medium text-muted-900 mb-3">Delivery Address</h3>
            <div className="flex items-start text-sm">
              <MapPin className="w-4 h-4 text-muted-500 mr-2 mt-0.5" />
              <div className="text-muted-600">
                <p>{order.deliveryAddress.street}</p>
                <p>{order.deliveryAddress.city}, {order.deliveryAddress.state}</p>
                <p>{order.deliveryAddress.pincode}</p>
                <p className="mt-1">Phone: {order.deliveryAddress.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="border-t border-muted-200 pt-6">
          <h3 className="font-medium text-muted-900 mb-4">Items Ordered ({order.items.length})</h3>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-muted-200 rounded-lg"></div>
                  <div>
                    <h4 className="font-medium text-muted-900">{item.name}</h4>
                    <p className="text-sm text-muted-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-muted-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-muted-200 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-muted-900">Total Amount</span>
            <span className="text-2xl font-bold text-primary-600">₹{order.total.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Button
          onClick={() => navigate(`/orders/${order.id}`)}
          className="flex items-center justify-center"
          size="lg"
        >
          <Truck className="w-5 h-5 mr-2" />
          Track Order
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate('/orders')}
          className="flex items-center justify-center"
          size="lg"
        >
          <FileText className="w-5 h-5 mr-2" />
          View All Orders
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="flex items-center justify-center"
          size="lg"
        >
          <Home className="w-5 h-5 mr-2" />
          Continue Shopping
        </Button>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-6 bg-primary-50 rounded-xl border border-primary-200"
      >
        <h3 className="font-semibold text-primary-900 mb-3">What happens next?</h3>
        <div className="space-y-2 text-sm text-primary-800">
          <div className="flex items-center">
            <ArrowRight className="w-4 h-4 mr-2" />
            <span>We&apos;ll confirm your order and start preparing it</span>
          </div>
          <div className="flex items-center">
            <ArrowRight className="w-4 h-4 mr-2" />
            <span>You&apos;ll receive SMS and email updates on order progress</span>
          </div>
          <div className="flex items-center">
            <ArrowRight className="w-4 h-4 mr-2" />
            <span>Your order will be delivered to the address provided</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default OrderSuccess