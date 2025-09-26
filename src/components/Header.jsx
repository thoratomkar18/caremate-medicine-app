import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Search, 
  MapPin, 
  ShoppingCart, 
  User, 
  Menu, 
  Bell,
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
    <header className="bg-white shadow-md border-b border-muted-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single Line Header */}
        <div className="flex items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0 mr-8">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-muted-100 rounded-lg transition-colors mr-2"
            >
              <Menu className="w-6 h-6 text-muted-600" />
            </button>
            
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <h1 className="text-lg font-bold text-primary-600 hidden sm:block">
                CareMate
              </h1>
            </Link>
          </div>

          {/* Category Links - Desktop Only */}
          <div className="hidden lg:flex items-center space-x-6 flex-shrink-0 mr-6">
            <Link to="/categories" className="text-sm text-muted-600 hover:text-primary-600 transition-colors whitespace-nowrap">
              All Categories
            </Link>
            <Link to="/prescription-medicines" className="text-sm text-muted-600 hover:text-primary-600 transition-colors whitespace-nowrap">
              Prescription Medicines
            </Link>
            <Link to="/health-devices" className="text-sm text-muted-600 hover:text-primary-600 transition-colors whitespace-nowrap">
              Health Devices
            </Link>
            <Link to="/personal-care" className="text-sm text-muted-600 hover:text-primary-600 transition-colors whitespace-nowrap">
              Personal Care
            </Link>
            <Link to="/offers" className="text-sm text-muted-600 hover:text-primary-600 transition-colors whitespace-nowrap">
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-400" />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
            {/* Location - Hidden on smaller screens */}
            <div className="relative hidden xl:block">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center space-x-1 p-2 hover:bg-muted-100 rounded-lg transition-colors"
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
                  className="absolute right-0 mt-2 w-64 bg-white border border-muted-200 rounded-lg shadow-lg z-50"
                >
                  <div className="p-3">
                    <h4 className="font-medium text-muted-900 mb-2">Select Location</h4>
                    <div className="space-y-2">
                      <div className="p-2 hover:bg-muted-50 rounded cursor-pointer">
                        <div className="font-medium text-sm">Wagholi, Pune</div>
                        <div className="text-xs text-muted-500">Default</div>
                      </div>
                      <div className="p-2 hover:bg-muted-50 rounded cursor-pointer">
                        <div className="font-medium text-sm">Hinjewadi, Pune</div>
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
              className="relative p-2 hover:bg-muted-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-muted-600" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </button>

            {/* Desktop Sign In/Up */}
            <div className="hidden lg:flex items-center space-x-3">
              {!user ? (
                <>
                  <Link
                    to="/login" 
                    className="text-sm text-muted-700 hover:text-primary-600 transition-colors font-medium whitespace-nowrap px-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup" 
                    className="text-sm text-primary-600 hover:text-primary-700 transition-colors font-medium whitespace-nowrap px-3 py-2 border border-primary-600 rounded-lg hover:bg-primary-50"
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
                    className="flex items-center space-x-1 px-3 py-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
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
              className="lg:hidden flex items-center space-x-2 p-2 hover:bg-primary-50 rounded-lg transition-colors border border-primary-200"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
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
