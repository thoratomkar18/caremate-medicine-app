import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Plus, 
  Minus,
  Shield,
  Truck,
  RotateCcw,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { apiClient } from '../services/api'
import Button from '../components/Button'
import { useCart } from '../hooks/useCart'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const { addToCart, isInCart, getCartItem } = useCart()

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => apiClient.getProduct(id),
  })

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    navigate('/checkout')
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-error-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-muted-900 mb-2">Product not found</h2>
          <p className="text-muted-600 mb-6">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
      </div>
    )
  }

  const cartItem = getCartItem(product.id)
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-muted-600 hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted-100 rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Image Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {[product.image, product.image, product.image, product.image].map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-primary-600' : 'border-muted-200'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-muted-500">{product.category}</span>
              {discountPercentage > 0 && (
                <span className="bg-error-100 text-error-600 text-xs px-2 py-1 rounded-full">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-muted-900 mb-2">
              {product.name}
            </h1>
            
            <p className="text-lg text-muted-600">
              {product.description}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-warning-400 fill-current'
                        : 'text-muted-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-muted-900">
                {product.rating}
              </span>
            </div>
            <span className="text-sm text-muted-500">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-primary-600">
              ₹{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-500 line-through">
                ₹{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            {product.inStock ? (
              <>
                <CheckCircle className="w-5 h-5 text-success-500" />
                <span className="text-success-600 font-medium">In Stock</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-error-500" />
                <span className="text-error-600 font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-muted-700">Quantity:</span>
            <div className="flex items-center space-x-2 border border-muted-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="p-2 hover:bg-muted-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
                className="p-2 hover:bg-muted-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {cartItem ? `Update Cart (${cartItem.quantity})` : 'Add to Cart'}
              </Button>
              
              <Button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                Buy Now
              </Button>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={handleWishlist}
                variant={isWishlisted ? 'primary' : 'outline'}
                className="flex-1"
              >
                <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </Button>
              
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4 pt-6 border-t border-muted-200">
            <h3 className="text-lg font-semibold text-muted-900">Why Choose This Product?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-success-500" />
                <span className="text-sm text-muted-700">100% Genuine</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-primary-500" />
                <span className="text-sm text-muted-700">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-accent-500" />
                <span className="text-sm text-muted-700">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-12 space-y-8">
        {/* Tabs */}
        <div className="border-b border-muted-200">
          <nav className="-mb-px flex space-x-8">
            {['Details', 'Benefits', 'Dosage', 'Side Effects'].map((tab) => (
              <button
                key={tab}
                className="py-2 px-1 border-b-2 border-transparent text-muted-500 hover:text-muted-700 hover:border-muted-300 font-medium text-sm"
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-muted-900 mb-3">Product Details</h4>
            <div className="space-y-2 text-sm text-muted-600">
              <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
              <p><strong>Composition:</strong> {product.composition}</p>
              <p><strong>Category:</strong> {product.category}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-muted-900 mb-3">Benefits</h4>
            <ul className="space-y-1 text-sm text-muted-600">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-muted-900 mb-3">Dosage</h4>
            <p className="text-sm text-muted-600">{product.dosage}</p>
          </div>

          <div>
            <h4 className="font-semibold text-muted-900 mb-3">Side Effects</h4>
            <p className="text-sm text-muted-600">{product.sideEffects}</p>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-muted-900 mb-6">Similar Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Similar products would be loaded here */}
          <div className="text-center py-8 text-muted-500">
            Similar products coming soon...
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
