import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './hooks/useAuth'
import { CartProvider } from './hooks/useCart'
import { worker } from './mocks/browser'

// Import pages
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Orders from './pages/Orders'
import TrackOrder from './pages/TrackOrder'
import Profile from './pages/Profile'
import Help from './pages/Help'
import Articles from './pages/Articles'

// Import category pages
import AllCategories from './pages/AllCategories'
import PrescriptionMedicines from './pages/PrescriptionMedicines'
import HealthDevices from './pages/HealthDevices'
import PersonalCare from './pages/PersonalCare'
import BabyCare from './pages/BabyCare'
import Offers from './pages/Offers'

// Import layout components
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Start MSW
const startMSW = async () => {
  try {
    console.log('🚀 Starting MSW...')
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/caremate-medicine-app/mockServiceWorker.js'
      }
    })
    console.log('🔧 MSW started successfully - Demo login should work!')
    
    // Test MSW is working
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      console.log('✅ MSW test successful:', data)
    } catch (testError) {
      console.error('❌ MSW test failed:', testError)
    }
  } catch (error) {
    console.error('❌ MSW failed to start:', error)
    console.log('📝 App will continue without MSW')
  }
}

// Start MSW immediately
startMSW()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router basename="/caremate-medicine-app" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#ffffff',
                  color: '#1f2937',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                },
                success: {
                  style: {
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    color: '#166534',
                  },
                },
              }}
            />
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected routes with layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/:id" element={<ProductDetails />} />
                
                {/* Category pages */}
                <Route path="categories" element={<AllCategories />} />
                <Route path="prescription-medicines" element={<PrescriptionMedicines />} />
                <Route path="health-devices" element={<HealthDevices />} />
                <Route path="personal-care" element={<PersonalCare />} />
                <Route path="baby-care" element={<BabyCare />} />
                <Route path="offers" element={<Offers />} />
                
                <Route path="checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="order-success/:id" element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                } />
                <Route path="orders" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
                <Route path="orders/:id" element={
                  <ProtectedRoute>
                    <TrackOrder />
                  </ProtectedRoute>
                } />
                <Route path="profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="help" element={<Help />} />
                <Route path="articles" element={<Articles />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
