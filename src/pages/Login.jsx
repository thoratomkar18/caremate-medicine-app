import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import Button from '../components/Button'
import Input from '../components/Input'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()

  const onSubmit = async (data) => {
    console.log('Login form submitted with data:', data)
    try {
      setLoading(true)
      console.log('Attempting login...')
      const result = await login(data.email, data.password)
      console.log('Login successful, navigating to home:', result)
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)
      setError('root', {
        type: 'manual',
        message: error.message || 'Login failed. Please try demo login or check if MSW is running.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    try {
      setLoading(true)
      console.log('Demo Login: Starting demo login process...')
      
      const result = await login('rushikesh@example.com', 'password')
      console.log('Demo Login: Login successful:', result)
      
      navigate('/')
    } catch (error) {
      console.error('Demo Login: Login failed:', error)
      setError('root', {
        type: 'manual',
        message: `Demo login failed: ${error.message || 'Please check if MSW is running.'}`
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h1 className="text-2xl font-bold text-primary-600">CareMate</h1>
          </div>
          <h2 className="text-3xl font-bold text-muted-900">
            Welcome back
          </h2>
          <p className="mt-2 text-muted-600">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-xl shadow-sm border border-muted-200 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {errors.root && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg">
              {errors.root.message}
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            leftIcon={<Mail className="w-4 h-4 text-muted-400" />}
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            leftIcon={<Lock className="w-4 h-4 text-muted-400" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-400 hover:text-muted-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-muted-300 text-primary-600 focus:ring-primary-500"
                {...register('remember')}
              />
              <span className="ml-2 text-sm text-muted-600">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Forgot password?
            </Link>
          </div>

          {/* PRIMARY LOGIN BUTTON */}
          <div style={{ margin: '20px 0' }}>
            <input 
              type="submit" 
              value={loading ? 'Signing In...' : 'SIGN IN'}
              disabled={loading}
              style={{
                width: '100%',
                height: '50px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#2563eb',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* DIVIDER */}
          <div style={{ textAlign: 'center', margin: '20px 0', color: '#666' }}>
            ── OR ──
          </div>

          {/* DEMO LOGIN BUTTON */}
          <div style={{ margin: '20px 0' }}>
            <input 
              type="button" 
              value="DEMO LOGIN"
              onClick={handleDemoLogin}
              disabled={loading}
              style={{
                width: '100%',
                height: '50px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#2563eb',
                backgroundColor: 'white',
                border: '2px solid #2563eb',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            />
          </div>

          <p className="text-center text-sm text-muted-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              Sign up
            </Link>
          </p>
        </motion.form>

        {/* Emergency Fallback Button */}
        <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px', marginBottom: '20px' }}>
          <p style={{ marginBottom: '10px', fontSize: '14px', color: '#dc2626' }}>If buttons above are not visible, use this emergency login:</p>
          <button
            onClick={() => {
              console.log('Emergency login button clicked')
              handleDemoLogin()
            }}
            style={{
              padding: '15px 30px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              minHeight: '50px'
            }}
          >
            🚨 EMERGENCY DEMO LOGIN
          </button>
        </div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-primary-50 border border-primary-200 rounded-lg p-4"
        >
          <h3 className="text-sm font-medium text-primary-900 mb-2">Demo Credentials</h3>
          <div className="text-xs text-primary-700 space-y-1">
            <p><strong>Email:</strong> rushikesh@example.com</p>
            <p><strong>Password:</strong> password</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login
