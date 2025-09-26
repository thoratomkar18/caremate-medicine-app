import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  SlidersHorizontal,
  SortAsc,
  X
} from 'lucide-react'
import { apiClient } from '../services/api'
import ProductCard from '../components/ProductCard'
import { useCart } from '../hooks/useCart'

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])

  const { addToCart } = useCart()

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', { search: searchQuery, category: selectedCategory }],
    queryFn: async () => {
      if (searchQuery) {
        return apiClient.searchProducts(searchQuery)
      }
      return apiClient.getProducts()
    },
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiClient.getCategories(),
  })

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category === selectedCategory
      )
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        // Default sorting (newest first)
        break
    }

    return filtered
  }, [products, selectedCategory, priceRange, sortBy])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchParams({ q: searchQuery })
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSearchParams({ category })
  }

  const handleSortChange = (sort) => {
    setSortBy(sort)
    setSearchParams({ sort })
  }

  const handleAddToCart = (product) => {
    addToCart(product, 1)
  }

  const handleViewDetails = (product) => {
    navigate(`/products/${product.id}`)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSortBy('')
    setPriceRange([0, 1000])
    setSearchParams({})
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-muted-900 mb-2">
          {selectedCategory ? selectedCategory : 'All Products'}
        </h1>
        <p className="text-muted-600">
          {filteredProducts.length} products found
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-muted-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-400" />
            </div>
          </form>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort */}
            <div className="flex items-center space-x-2">
              <SortAsc className="w-4 h-4 text-muted-500" />
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-muted-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-1 border border-muted-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-muted-500'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-muted-500'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden p-2 border border-muted-300 rounded-lg"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        {(showFilters || window.innerWidth >= 1024) && (
          <div className="mt-4 pt-4 border-t border-muted-200">
            <div className="flex flex-wrap items-center gap-4">
              {/* Categories */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-700">Category:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      !selectedCategory
                        ? 'bg-primary-600 text-white'
                        : 'bg-muted-100 text-muted-700 hover:bg-muted-200'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.name)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedCategory === category.name
                          ? 'bg-primary-600 text-white'
                          : 'bg-muted-100 text-muted-700 hover:bg-muted-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-700">Price:</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-20 px-2 py-1 border border-muted-300 rounded text-sm"
                  />
                  <span className="text-muted-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                    className="w-20 px-2 py-1 border border-muted-300 rounded text-sm"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-error-600 hover:bg-error-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-muted-900 mb-2">
            No products found
          </h3>
          <p className="text-muted-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={clearFilters}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className={`grid ${
          viewMode === 'grid' 
            ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' 
            : 'grid-cols-1 gap-6'
        }`}>
          {filteredProducts.map((product, index) => {
            const discountPercentage = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
                  className={viewMode === 'list' ? 'flex flex-row' : ''}
                />
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ProductList
