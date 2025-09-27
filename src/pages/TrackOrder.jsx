import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Package, 
  CheckCircle, 
  Clock, 
  Truck, 
  MapPin,
  Phone,
  Calendar,
  CreditCard
} from 'lucide-react'
import { apiClient } from '../services/api'
import Button from '../components/Button'

const TrackOrder = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', id],
    queryFn: () => apiClient.getOrder(id),
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ordered':
        return <Package className="w-5 h-5" />
      case 'confirmed':
        return <CheckCircle className="w-5 h-5" />
      case 'packed':
        return <Package className="w-5 h-5" />
      case 'shipped':
        return <Truck className="w-5 h-5" />
      case 'out_for_delivery':
        return <Truck className="w-5 h-5" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  const getStatusColor = (status, isCompleted) => {
    if (isCompleted) {
      return 'text-success-600 bg-success-100 border-success-200'
    }
    switch (status) {
      case 'ordered':
      case 'confirmed':
      case 'packed':
      case 'shipped':
      case 'out_for_delivery':
        return 'text-primary-600 bg-primary-100 border-primary-200'
      case 'delivered':
        return 'text-success-600 bg-success-100 border-success-200'
      default:
        return 'text-muted-600 bg-muted-100 border-muted-200'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCurrentStatusIndex = () => {
    if (!order?.tracking?.timeline) return 0
    const statuses = ['ordered', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered']
    const currentStatus = order.tracking.status
    return statuses.indexOf(currentStatus)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-primary-600"></div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-error-500" />
          <h2 className="mb-2 text-2xl font-bold text-muted-900">Order not found</h2>
          <p className="mb-6 text-muted-600">The order you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => navigate('/orders')}>
            View All Orders
          </Button>
        </div>
      </div>
    )
  }

  const currentStatusIndex = getCurrentStatusIndex()

  return (
    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center mb-8 space-x-4">
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center space-x-2 transition-colors text-muted-600 hover:text-primary-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Orders</span>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-muted-900">Track Order</h1>
          <p className="text-muted-600">Order #{order.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Order Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order Status */}
          <div className="p-6 bg-white border rounded-xl border-muted-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-muted-900">Order Status</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status, true)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
              </span>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {order.tracking?.timeline?.map((timelineItem, index) => {
                const isCompleted = index <= currentStatusIndex
                const isCurrent = index === currentStatusIndex
                
                return (
                  <motion.div
                    key={timelineItem.status}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-start space-x-4 p-4 rounded-lg border transition-colors ${
                      isCurrent ? 'bg-primary-50 border-primary-200' : 
                      isCompleted ? 'bg-success-50 border-success-200' : 'bg-muted-50 border-muted-200'
                    }`}
                  >
                    <div className={`p-2 rounded-full border ${
                      isCompleted ? 'bg-success-100 border-success-200' : 
                      isCurrent ? 'bg-primary-100 border-primary-200' : 'bg-muted-100 border-muted-200'
                    }`}>
                      {getStatusIcon(timelineItem.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium capitalize text-muted-900">
                        {timelineItem.status.replace('_', ' ')}
                      </h4>
                      <p className="mt-1 text-sm text-muted-600">
                        {timelineItem.message}
                      </p>
                      <p className="mt-2 text-xs text-muted-500">
                        {formatDate(timelineItem.date)}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6 bg-white border rounded-xl border-muted-200">
            <h2 className="mb-6 text-lg font-semibold text-muted-900">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center p-4 space-x-4 rounded-lg bg-muted-50">
                  <div className="w-16 h-16 rounded-lg bg-muted-200"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-muted-900">{item.name}</h4>
                    <p className="text-sm text-muted-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-muted-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-600">
                      ₹{item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Order Info */}
          <div className="p-6 bg-white border rounded-xl border-muted-200">
            <h2 className="mb-4 text-lg font-semibold text-muted-900">Order Information</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-muted-500" />
                <div>
                  <p className="text-sm text-muted-500">Order Date</p>
                  <p className="font-medium text-muted-900">{formatDate(order.date)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CreditCard className="w-4 h-4 text-muted-500" />
                <div>
                  <p className="text-sm text-muted-500">Payment Method</p>
                  <p className="font-medium text-muted-900">{order.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="p-6 bg-white border rounded-xl border-muted-200">
            <h2 className="mb-4 text-lg font-semibold text-muted-900">Delivery Address</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-muted-500" />
                <div>
                  <p className="font-medium text-muted-900">{order.deliveryAddress.type}</p>
                  <p className="text-sm text-muted-600">
                    {order.deliveryAddress.street}, {order.deliveryAddress.area}<br />
                    {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-muted-500" />
                <p className="text-sm text-muted-600">{order.deliveryAddress.phone}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-6 bg-white border rounded-xl border-muted-200">
            <h2 className="mb-4 text-lg font-semibold text-muted-900">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-600">Items ({order.items.length})</span>
                <span className="text-muted-900">₹{order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-600">Delivery</span>
                <span className="text-muted-900">Free</span>
              </div>
              <div className="pt-3 border-t border-muted-200">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {order.status === 'delivered' && (
              <Button className="w-full" size="lg">
                Reorder
              </Button>
            )}
            <Button variant="outline" className="w-full">
              Download Invoice
            </Button>
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackOrder
