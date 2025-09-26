import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { 
  ArrowLeft, 
  MapPin, 
  CreditCard, 
  Shield, 
  Plus,
  CheckCircle,
  Radio,
  ShoppingBag
} from 'lucide-react'
import { apiClient } from '../services/api'
import Button from '../components/Button'
import Input from '../components/Input'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [showAddAddress, setShowAddAddress] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: user?.phone || '',
      paymentMethod: 'upi'
    }
  })

  const checkoutMutation = useMutation({
    mutationFn: (orderData) => apiClient.checkout(orderData),
    onSuccess: (order) => {
      clearCart()
      navigate(`/order-success/${order.id}`)
    },
    onError: (error) => {
      console.error('Checkout failed:', error)
    }
  })

  const validateAndSubmit = () => {
    // Check if address is selected or filled
    const hasAddress = selectedAddress || (showAddAddress && watch('address') && watch('city') && watch('state') && watch('pincode') && watch('phone'))
    
    if (!hasAddress) {
      toast.error('Please select a delivery address or fill in the address form', {
        duration: 4000,
        style: {
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#dc2626',
        },
      })
      return
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method', {
        duration: 4000,
        style: {
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#dc2626',
        },
      })
      return
    }

    // If validation passes, trigger form submission
    handleSubmit(onSubmit)()
  }

  const onSubmit = async (data) => {
    const orderData = {
      deliveryAddress: selectedAddress || {
        street: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        phone: data.phone
      },
      paymentMethod,
      items: cartItems.map(item => ({
        productId: item.productId,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      total: getCartTotal()
    }

    checkoutMutation.mutate(orderData)
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-muted-400 mb-4">
            <ShoppingBag className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-muted-900 mb-2">Your cart is empty</h2>
          <p className="text-muted-600 mb-6">Add some products to proceed with checkout.</p>
          <Button onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  const subtotal = getCartTotal()
  const deliveryFee = subtotal > 500 ? 0 : 50
  const total = subtotal + deliveryFee

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-muted-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold text-muted-900">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Delivery Address */}
          <div className="bg-white rounded-xl border border-muted-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-muted-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary-600" />
                Delivery Address
              </h2>
              <button
                type="button"
                onClick={() => setShowAddAddress(!showAddAddress)}
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add New Address
              </button>
            </div>

            {/* Existing Addresses */}
            {user?.addresses && user.addresses.length > 0 && (
              <div className="space-y-3 mb-6">
                {user.addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedAddress?.id === address.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-muted-200 hover:border-muted-300'
                    }`}
                    onClick={() => setSelectedAddress(address)}
                  >
                    <div className="flex items-start space-x-3">
                      <Radio
                        className={`w-5 h-5 mt-0.5 ${
                          selectedAddress?.id === address.id
                            ? 'text-primary-600'
                            : 'text-muted-400'
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-muted-900">
                            {address.type}
                          </span>
                          {address.isDefault && (
                            <span className="bg-primary-100 text-primary-600 text-xs px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-600">
                          {address.street}, {address.area}, {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-sm text-muted-500 mt-1">
                          Phone: {address.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Address Form */}
            {showAddAddress && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="border-t border-muted-200 pt-6 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Street Address"
                    placeholder="Enter street address"
                    error={errors.address?.message}
                    {...register('address', { required: 'Street address is required' })}
                  />
                  <Input
                    label="Area/Locality"
                    placeholder="Enter area or locality"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    placeholder="Enter city"
                    error={errors.city?.message}
                    {...register('city', { required: 'City is required' })}
                  />
                  <Input
                    label="State"
                    placeholder="Enter state"
                    error={errors.state?.message}
                    {...register('state', { required: 'State is required' })}
                  />
                  <Input
                    label="Pincode"
                    placeholder="Enter pincode"
                    error={errors.pincode?.message}
                    {...register('pincode', { 
                      required: 'Pincode is required',
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: 'Pincode must be 6 digits'
                      }
                    })}
                  />
                </div>
                
                <Input
                  label="Phone Number"
                  placeholder="Enter phone number"
                  error={errors.phone?.message}
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Phone number must be 10 digits'
                    }
                  })}
                />
              </motion.div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl border border-muted-200 p-6">
            <h2 className="text-lg font-semibold text-muted-900 flex items-center mb-6">
              <CreditCard className="w-5 h-5 mr-2 text-primary-600" />
              Payment Method
            </h2>

            <div className="space-y-3">
              {[
                { id: 'upi', name: 'UPI', description: 'Pay using UPI apps like GPay, PhonePe' },
                { id: 'card', name: 'Credit/Debit Card', description: 'Pay using your card' },
                { id: 'netbanking', name: 'Net Banking', description: 'Pay using online banking' },
                { id: 'cod', name: 'Cash on Delivery', description: 'Pay when you receive the order' }
              ].map((method) => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === method.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-muted-200 hover:border-muted-300'
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className="flex items-start space-x-3">
                    <Radio
                      className={`w-5 h-5 mt-0.5 ${
                        paymentMethod === method.id
                          ? 'text-primary-600'
                          : 'text-muted-400'
                      }`}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-muted-900">
                        {method.name}
                      </div>
                      <p className="text-sm text-muted-600">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-muted-200 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-muted-900 mb-6">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-muted-100 rounded-lg overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-muted-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-muted-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-muted-900">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t border-muted-200 pt-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-600">Subtotal</span>
                <span className="text-muted-900">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-600">Delivery Fee</span>
                <span className="text-muted-900">
                  {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
                </span>
              </div>
              {subtotal < 500 && (
                <p className="text-xs text-muted-500">
                  Add ₹{(500 - subtotal).toFixed(2)} more for free delivery
                </p>
              )}
              <div className="flex justify-between font-semibold text-lg border-t border-muted-200 pt-3">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 mb-6 p-3 bg-muted-50 rounded-lg">
              <Shield className="w-4 h-4 text-success-600" />
              <span className="text-sm text-muted-600">SSL Secured Checkout</span>
            </div>

            {/* Place Order Button - Primary Checkout */}
            <div 
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                padding: '18px 24px',
                borderRadius: '12px',
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: '700',
                cursor: checkoutMutation.isPending ? 'not-allowed' : 'pointer',
                margin: '16px 0',
                border: '2px solid #059669',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                opacity: checkoutMutation.isPending ? '0.6' : '1',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onClick={checkoutMutation.isPending ? null : validateAndSubmit}
              onMouseOver={(e) => {
                if (!checkoutMutation.isPending) {
                  e.target.style.background = 'linear-gradient(135deg, #059669, #047857)'
                  e.target.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)'
                  e.target.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseOut={(e) => {
                if (!checkoutMutation.isPending) {
                  e.target.style.background = 'linear-gradient(135deg, #10b981, #059669)'
                  e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)'
                  e.target.style.transform = 'translateY(0px)'
                }
              }}
            >
              <CheckCircle style={{ width: '20px', height: '20px' }} />
              {checkoutMutation.isPending ? 'Processing Order...' : 'Secure Payment'}
            </div>

            <p className="text-xs text-muted-500 text-center mt-3">
              By placing this order, you agree to our Terms and Conditions
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout
