import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import toast from 'react-hot-toast'

// Resolve image src to support:
// - External absolute URLs (https, http, data, blob)
// - Local public/ images with Vite base (GitHub Pages)
const resolveImageSrc = (src) => {
  if (!src) return ''
  if (/^(https?:|data:|blob:)/i.test(src)) return src
  const base = (import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/'
  const normalized = src.replace(/^\//, '')
  return `${base}${normalized}`
}

// Category-based default images when product.image is empty
const defaultImageFor = (product) => {
  const c = (product?.category || '').toLowerCase()
  if (c.includes('digestive')) return 'images/digestive-health.svg'
  if (c.includes('medical')) return 'images/medical-device.svg'
  if (c.includes('pain')) return 'images/pain-relief.svg'
  if (c.includes('baby')) return 'images/baby-care.svg'
  if (c.includes('personal')) return 'images/personal-care.svg'
  if (c.includes('eye')) return 'images/eye-care.svg'
  if (c.includes('cough') || c.includes('cold')) return 'images/cough-cold.svg'
  if (c.includes('first')) return 'images/first-aid.svg'
  if (c.includes('skin')) return 'images/skin-care.svg'
  return 'images/vitamin-supplement.svg'
}

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onAddToWishlist, 
  onViewDetails,
  onBuyNow,
  className = '' 
}) => {
  // Calculate discount percentage if needed
  // const discountPercentage = product.originalPrice 
  //   ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  //   : 0

  const imgSrc = resolveImageSrc(product.image || defaultImageFor(product))

  return (
    <motion.div
      className={`card-hover ${className}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <div className="relative">
        <div 
          className="mb-3 overflow-hidden rounded-lg bg-muted-100" 
          style={{ 
            height: '120px',
            width: '100%',
            position: 'relative',
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb'
          }}
        >
          <img
            src={imgSrc}
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
              const img = e.currentTarget
              // First fallback: try category image once
              if (!img.dataset.fallbackTried) {
                img.dataset.fallbackTried = '1'
                const fallback = resolveImageSrc(defaultImageFor(product))
                img.src = fallback
                return
              }
              // Final fallback: inline placeholder (avoid loops)
              if (!img.dataset.placeholderSet) {
                img.dataset.placeholderSet = '1'
                img.src = 'data:image/svg+xml;base64,' + btoa(`
                <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <rect width="200" height="200" fill="#f3f4f6"/>
                  <circle cx="100" cy="80" r="25" fill="#9ca3af"/>
                  <rect x="60" y="120" width="80" height="30" rx="5" fill="#9ca3af"/>
                  <text x="100" y="170" font-family="Arial" font-size="12" text-anchor="middle" fill="#6b7280">Product Image</text>
                </svg>
              `)
                e.target.alt = `${product.name} - Product image`
              }
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
          <h3 className="mb-1 text-xs font-medium leading-tight text-gray-900 sm:text-sm" style={{ 
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
            <span className="ml-1 text-xs font-medium text-gray-900">
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
              <span className="text-sm font-semibold text-blue-600 sm:text-base">
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '32px',
                minHeight: '32px'
              }}
            >
              <ShoppingCart style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
          
          {/* ACTION BUTTONS */}
          <div className="flex items-stretch w-full gap-1 mt-2 sm:gap-2">
            <button
              onClick={() => onViewDetails?.(product)}
              title="View Product Details"
              className="flex-1 py-0.5 px-1 sm:py-1.5 sm:px-3 text-xs sm:text-sm font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded sm:rounded-md hover:bg-blue-50 transition-colors min-h-5 sm:min-h-7 flex items-center justify-center"
            >
              VIEW
            </button>
            
            {onBuyNow && (
              <button
                onClick={() => onBuyNow?.(product)}
                disabled={!product.inStock}
                title="Buy - Instant Purchase"
                className={`flex-1 py-0.5 px-1 sm:py-1.5 sm:px-3 text-xs sm:text-sm font-semibold text-white border-none rounded sm:rounded-md transition-colors min-h-5 sm:min-h-7 flex items-center justify-center whitespace-nowrap ${
                  product.inStock 
                    ? 'bg-green-600 hover:bg-green-700 cursor-pointer' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                BUY
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
