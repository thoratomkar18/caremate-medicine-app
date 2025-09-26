import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, Zap, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onAddToWishlist, 
  onViewDetails,
  onBuyNow,
  className = '' 
}) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      className={`card-hover ${className}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <div className="relative">
        <div 
          className="bg-muted-100 rounded-lg mb-3 overflow-hidden" 
          style={{ 
            height: '120px',
            width: '100%',
            position: 'relative',
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb'
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              objectPosition: 'center',
              padding: '8px',
              backgroundColor: 'white'
            }}
            onError={(e) => {
              console.log('Image failed to load:', product.name)
              // Use data URI as fallback - guaranteed to work offline
              e.target.src = 'data:image/svg+xml;base64,' + btoa(`
                <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <rect width="200" height="200" fill="#f3f4f6"/>
                  <circle cx="100" cy="80" r="25" fill="#9ca3af"/>
                  <rect x="60" y="120" width="80" height="30" rx="5" fill="#9ca3af"/>
                  <text x="100" y="170" font-family="Arial" font-size="12" text-anchor="middle" fill="#6b7280">Product Image</text>
                </svg>
              `)
              e.target.alt = `${product.name} - Product image`
            }}
            loading="lazy"
          />
        </div>
        
        {/* Discount badge removed - now handled by parent components */}
        
        {!product.inStock && (
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: '#64748b',
            color: 'white',
            fontSize: '11px',
            fontWeight: '600',
            padding: '4px 8px',
            borderRadius: '12px',
            zIndex: '5'
          }}>
            Out of Stock
          </div>
        )}
        
        <button
          onClick={() => onAddToWishlist?.(product)}
          style={{
            position: 'absolute',
            top: '8px',
            right: product.inStock ? '8px' : '100px',
            padding: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            zIndex: '5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Heart style={{ width: '16px', height: '16px', color: '#64748b' }} />
        </button>
      </div>
      
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', padding: '0 2px' }}>
        {/* Product Info - Fixed Height */}
        <div style={{ minHeight: '42px', marginBottom: '4px' }}>
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 leading-tight mb-1" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.name}
          </h3>
          <p className="text-xs text-gray-500" style={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {product.manufacturer}
          </p>
        </div>
        
        {/* Rating - Fixed Height */}
        <div className="flex items-center gap-1 mb-2" style={{ minHeight: '16px' }}>
          <div className="flex items-center">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-gray-900 ml-1">
              {product.rating}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviews})
          </span>
        </div>
        
        {/* PRICE AND CART SECTION */}
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-sm sm:text-base font-semibold text-blue-600">
                ₹{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* ADD TO CART BUTTON */}
            <button
              onClick={() => {
                onAddToCart?.(product)
                if (product.inStock) {
                  toast.success(`Added ${product.name} to cart!`, {
                    icon: '🛒',
                    duration: 3000,
                  })
                }
              }}
              disabled={!product.inStock}
              title="Add to Cart"
              className={`p-2 rounded-lg flex items-center justify-center min-w-8 min-h-8 transition-colors ${
                product.inStock 
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
                  : 'bg-gray-300 cursor-not-allowed'
              } text-white`}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
          
          {/* ACTION BUTTONS */}
          <div className="flex gap-2 w-full mt-2">
            <button
              onClick={() => onViewDetails?.(product)}
              title="View Product Details"
              className="flex-1 py-2 px-3 text-xs font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-md hover:bg-blue-50 transition-colors min-h-8 flex items-center justify-center"
            >
              VIEW
            </button>
            
            {onBuyNow && (
              <button
                onClick={() => onBuyNow?.(product)}
                disabled={!product.inStock}
                title="Buy Now - Instant Purchase"
                className={`flex-1 py-2 px-3 text-xs font-semibold text-white border-none rounded-md transition-colors min-h-8 flex items-center justify-center ${
                  product.inStock 
                    ? 'bg-green-600 hover:bg-green-700 cursor-pointer' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                BUY NOW
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
