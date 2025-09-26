import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'

const DebugInfo = () => {
  const { user, isAuthenticated } = useAuth()
  const { cartItems, getCartItemCount } = useCart()

  return (
    <div className="fixed top-4 right-4 bg-black text-white p-4 rounded-lg text-xs z-50 max-w-xs">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <div>User: {user ? `${user.email} (${user.name})` : 'Not logged in'}</div>
      <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
      <div>Cart Items: {getCartItemCount()}</div>
      <div>Cart Data: {JSON.stringify(cartItems.slice(0, 2))}</div>
    </div>
  )
}

export default DebugInfo
