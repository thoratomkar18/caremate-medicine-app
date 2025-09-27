import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Search, 
  MapPin, 
  ShoppingCart, 
  User, 
  Menu, 
  ChevronDown
} from 'lucide-react'

const Header = ({ 
  onSearch, 
  cartItemCount, 
  onCartClick, 
  user,
  onProfileClick,
  onMenuClick 
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search submitted:', searchQuery)
    onSearch?.(searchQuery)
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b shadow-md border-muted-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Single Line Header */}
        <div className="flex items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0 mr-8">
            <button
              onClick={onMenuClick}
              className="p-2 mr-2 transition-colors rounded-lg lg:hidden hover:bg-muted-100"
            >
              <Menu className="w-6 h-6 text-muted-600" />
            </button>
            
            <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600">
                <span className="text-lg font-bold text-white">C</span>
              </div>
              <h1 className="hidden text-lg font-bold text-primary-600 sm:block">
                CareMate
              </h1>
            </Link>
          </div>

          {/* Category Links - Desktop Only */}
          <div className="items-center flex-shrink-0 hidden mr-6 space-x-6 lg:flex">
            <Link to="/categories" className="text-sm transition-colors text-muted-600 hover:text-primary-600 whitespace-nowrap">
              All Categories
            </Link>
            <Link to="/prescription-medicines" className="text-sm transition-colors text-muted-600 hover:text-primary-600 whitespace-nowrap">
              Prescription Medicines
            </Link>
            <Link to="/health-devices" className="text-sm transition-colors text-muted-600 hover:text-primary-600 whitespace-nowrap">
              Health Devices
            </Link>
            <Link to="/personal-care" className="text-sm transition-colors text-muted-600 hover:text-primary-600 whitespace-nowrap">
              Personal Care
            </Link>
            <Link to="/offers" className="text-sm transition-colors text-muted-600 hover:text-primary-600 whitespace-nowrap">
              Offers
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search medicines, health products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white shadow-sm"
              />
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-400" />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center flex-shrink-0 ml-4 space-x-4">
            {/* Location - Hidden on smaller screens */}
            <div className="relative hidden xl:block">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center p-2 space-x-1 transition-colors rounded-lg hover:bg-muted-100"
              >
                <MapPin className="w-4 h-4 text-muted-600" />
                <span className="text-xs text-muted-900">
                  Pune
                </span>
                <ChevronDown className="w-3 h-3 text-muted-400" />
              </button>
              
              {showLocationDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 z-50 w-64 mt-2 bg-white border rounded-lg shadow-lg border-muted-200"
                >
                  <div className="p-3">
                    <h4 className="mb-2 font-medium text-muted-900">Select Location</h4>
                    <div className="space-y-2">
                      <div className="p-2 rounded cursor-pointer hover:bg-muted-50">
                        <div className="text-sm font-medium">Wagholi, Pune</div>
                        <div className="text-xs text-muted-500">Default</div>
                      </div>
                      <div className="p-2 rounded cursor-pointer hover:bg-muted-50">
                        <div className="text-sm font-medium">Hinjewadi, Pune</div>
                        <div className="text-xs text-muted-500">Office</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 transition-colors rounded-lg hover:bg-muted-100"
            >
              <ShoppingCart className="w-5 h-5 text-muted-600" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-1 -right-1 bg-primary-600"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </button>

            {/* Desktop Sign In/Up */}
            <div className="items-center hidden space-x-3 lg:flex">
              {!user ? (
                <>
                  <Link
                    to="/login" 
                    className="px-2 text-sm font-medium transition-colors text-muted-700 hover:text-primary-600 whitespace-nowrap"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup" 
                    className="px-3 py-2 text-sm font-medium transition-colors border rounded-lg text-primary-600 hover:text-primary-700 whitespace-nowrap border-primary-600 hover:bg-primary-50"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-600 whitespace-nowrap">
                    Hello, {user.name || user.email.split('@')[0]}!
                  </span>
                  <button
                    onClick={onProfileClick}
                    className="flex items-center px-3 py-2 space-x-1 transition-colors border rounded-lg border-primary-300 text-primary-600 hover:bg-primary-50"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Profile</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Profile */}
            <button
              onClick={onProfileClick}
              className="flex items-center p-2 space-x-2 transition-colors border rounded-lg lg:hidden hover:bg-primary-50 border-primary-200"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100">
                <User className="w-4 h-4 text-primary-600" />
              </div>
              <span className="text-sm font-medium text-primary-700">
                {user ? (user.name || user.email.split('@')[0]) : 'Sign In'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
