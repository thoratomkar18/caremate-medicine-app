import { useState, useEffect, createContext, useContext } from 'react'
import { apiClient } from '../services/api'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Failed to parse saved cart:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = async (product, quantity = 1) => {
    try {
      setLoading(true)
      
      // Check if product already exists in cart
      const existingItem = cartItems.find(item => item.productId === product.id)
      
      if (existingItem) {
        // Update quantity
        await updateQuantity(existingItem.id, existingItem.quantity + quantity)
      } else {
        // Add new item
        const newItem = {
          id: Date.now(),
          productId: product.id,
          quantity,
          product: { ...product }
        }
        
        setCartItems(prev => [...prev, newItem])
        
        // Sync with server if authenticated
        const token = localStorage.getItem('authToken')
        if (token) {
          await apiClient.addToCart(product.id, quantity)
        }
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      setLoading(true)
      
      if (newQuantity <= 0) {
        removeFromCart(itemId)
        return
      }
      
      setCartItems(prev => 
        prev.map(item => 
          item.id === itemId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
      
      // Sync with server if authenticated
      const token = localStorage.getItem('authToken')
      if (token) {
        await apiClient.updateCartItem(itemId, newQuantity)
      }
    } catch (error) {
      console.error('Failed to update quantity:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (itemId) => {
    try {
      setLoading(true)
      
      setCartItems(prev => prev.filter(item => item.id !== itemId))
      
      // Sync with server if authenticated
      const token = localStorage.getItem('authToken')
      if (token) {
        await apiClient.removeCartItem(itemId)
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cart')
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartItem = (productId) => {
    return cartItems.find(item => item.productId === productId)
  }

  const isInCart = (productId) => {
    return cartItems.some(item => item.productId === productId)
  }

  const value = {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getCartItem,
    isInCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
