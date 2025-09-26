import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, ShoppingBag, Package, User, HelpCircle } from 'lucide-react'
import { useCart } from '../hooks/useCart'

const BottomNav = () => {
  const location = useLocation()
  const { getCartItemCount } = useCart()

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/help', icon: HelpCircle, label: 'Help' },
    { path: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-muted-200 lg:hidden z-40">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path
          const isCart = path === '/orders'
          
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center px-2 py-1 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-muted-600 hover:text-primary-600'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {isCart && getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
