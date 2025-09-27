import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'
import CartDrawer from './CartDrawer'
import BottomNav from './BottomNav'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'

const Layout = () => {
  const navigate = useNavigate()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartItems, updateQuantity, removeFromCart } = useCart()
  const { user } = useAuth()

  const handleCartClick = () => {
    console.log('Cart clicked, opening drawer')
    setIsCartOpen(true)
  }

  const handleCartClose = () => {
    setIsCartOpen(false)
  }

  const handleProfileClick = () => {
    console.log('Profile clicked, user:', user)
    if (user) {
      // Navigate to profile
      console.log('Navigating to profile')
      navigate('/profile')
    } else {
      // Navigate to login
      console.log('Navigating to login')
      navigate('/login')
    }
  }

  const handleSearch = (query) => {
    navigate(`/products?q=${encodeURIComponent(query)}`)
  }

  const handleMenuClick = () => {
    // Handle mobile menu - could open a mobile menu drawer
    console.log('Mobile menu clicked')
    // For now, just navigate to products
    navigate('/products')
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    navigate('/checkout')
  }

  return (
    <div className="min-h-screen bg-muted-50">
      <Header
        onCartClick={handleCartClick}
        cartItemCount={cartItems.length}
        user={user}
        onProfileClick={handleProfileClick}
        onMenuClick={handleMenuClick}
        onSearch={handleSearch}
      />
      
      <main className="pb-20 lg:pb-8">
        <Outlet />
      </main>
      
      <BottomNav />
      
      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCartClose}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  )
}

export default Layout
