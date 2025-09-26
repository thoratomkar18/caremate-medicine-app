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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
              style={{
                padding: '8px',
                backgroundColor: product.inStock ? '#2563eb' : '#d1d5db',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: product.inStock ? 'pointer' : 'not-allowed',
                display: 'flex !important',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '32px',
                minHeight: '32px',
                position: 'relative',
                zIndex: '10'
              }}
            >
              <ShoppingCart style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
          
          {/* ACTION BUTTONS */}
          <div style={{ 
            display: 'flex !important', 
            gap: '6px', 
            width: '100%',
            visibility: 'visible !important',
            opacity: '1 !important'
          }}>
            <button
              onClick={() => onViewDetails?.(product)}
              title="View Product Details"
              className="flex-1 py-2 px-2 text-xs font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded cursor-pointer text-center min-h-8"
            >
              VIEW
            </button>
            
            {onBuyNow && (
              <button
                onClick={() => onBuyNow?.(product)}
                disabled={!product.inStock}
                title="Buy Now - Instant Purchase"
                className={`flex-1 py-2 px-2 text-xs font-semibold text-white border-none rounded text-center min-h-8 ${
                  product.inStock 
                    ? 'bg-green-600 cursor-pointer' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                BUY NOW
              </button>
            )}
          </div>
          
          {/* EMERGENCY FALLBACK BUTTONS */}
          <div style={{ 
            display: 'block !important',
            backgroundColor: '#f3f4f6',
            padding: '8px',
            borderRadius: '6px',
            fontSize: '10px',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              <input 
                type="button" 
                value="ADD TO CART" 
                onClick={() => {
                  onAddToCart?.(product)
                  if (product.inStock) {
                    toast.success(`Added ${product.name} to cart!`, {
                      icon: '🛒',
                      duration: 3000,
                    })
                  }
                }}
                style={{
                  flex: 1,
                  padding: '6px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '9px',
                  cursor: 'pointer'
                }}
              />
              {onBuyNow && (
                <input 
                  type="button" 
                  value="BUY NOW" 
                  onClick={() => onBuyNow?.(product)}
                  style={{
                    flex: 1,
                    padding: '6px',
                    backgroundColor: '#16a34a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '9px',
                    cursor: 'pointer'
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
