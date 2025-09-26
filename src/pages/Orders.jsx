import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { 
  Package, 
  Search, 
  Filter, 
  Eye, 
  Clock, 
  CheckCircle,
  Truck,
  AlertCircle
} from 'lucide-react'
import { apiClient } from '../services/api'
import Button from '../components/Button'

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => apiClient.getOrders(),
  })

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-success-500" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-primary-500" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-success-500" />
      case 'cancelled':
        return <AlertCircle className="w-5 h-5 text-error-500" />
      default:
        return <Clock className="w-5 h-5 text-warning-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-success-600 bg-success-50 border-success-200'
      case 'shipped':
        return 'text-primary-600 bg-primary-50 border-primary-200'
      case 'delivered':
        return 'text-success-600 bg-success-50 border-success-200'
      case 'cancelled':
        return 'text-error-600 bg-error-50 border-error-200'
      default:
        return 'text-warning-600 bg-warning-50 border-warning-200'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const handleViewOrder = (orderId) => {
    window.location.href = `/orders/${orderId}`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-muted-900 mb-2">My Orders</h1>
        <p className="text-muted-600">Track and manage your orders</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-muted-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-400" />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-muted-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Orders</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-400 mb-4">
            <Package className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-muted-900 mb-2">
            {orders.length === 0 ? 'No orders yet' : 'No orders found'}
          </h3>
          <p className="text-muted-600 mb-6">
            {orders.length === 0 
              ? 'Start shopping to see your orders here'
              : 'Try adjusting your search or filter criteria'
            }
          </p>
          {orders.length === 0 && (
            <Button onClick={() => window.location.href = '/products'}>
              Start Shopping
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg border border-muted-200 p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-500">
                      Order #{order.id}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-500">Order Date</p>
                      <p className="font-medium text-muted-900">{formatDate(order.date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-500">Items</p>
                      <p className="font-medium text-muted-900">{order.items.length} item(s)</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-500">Total Amount</p>
                      <p className="font-medium text-muted-900">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-3 text-sm">
                        <div className="w-8 h-8 bg-muted-100 rounded"></div>
                        <div className="flex-1">
                          <span className="font-medium text-muted-900">{item.name}</span>
                        </div>
                        <div className="text-muted-600">
                          Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2 lg:items-end">
                  <Button
                    onClick={() => handleViewOrder(order.id)}
                    variant="outline"
                    className="w-full lg:w-auto"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  
                  {order.status === 'delivered' && (
                    <Button
                      variant="outline"
                      className="w-full lg:w-auto"
                    >
                      Reorder
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Order Status Legend */}
      <div className="mt-8 bg-muted-50 rounded-lg p-4">
        <h3 className="font-medium text-muted-900 mb-3">Order Status Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-success-500" />
            <span className="text-muted-600">Confirmed - Order received and confirmed</span>
          </div>
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-primary-500" />
            <span className="text-muted-600">Shipped - Order dispatched for delivery</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-success-500" />
            <span className="text-muted-600">Delivered - Order successfully delivered</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-error-500" />
            <span className="text-muted-600">Cancelled - Order was cancelled</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
