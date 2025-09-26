const API_BASE_URL = import.meta.env.VITE_API_URL || ''

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const token = localStorage.getItem('authToken')
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async signup(userData) {
    return this.request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async getCurrentUser() {
    return this.request('/api/auth/me')
  }

  // Products
  async getProducts() {
    return this.request('/api/products')
  }

  async getProduct(id) {
    return this.request(`/api/products/${id}`)
  }

  async getCategories() {
    return this.request('/api/categories')
  }

  async getFeaturedProducts() {
    return this.request('/api/featured')
  }

  async getPopularProducts() {
    return this.request('/api/popular')
  }

  async searchProducts(query) {
    return this.request(`/api/search?q=${encodeURIComponent(query)}`)
  }

  // Cart
  async getCart() {
    return this.request('/api/cart')
  }

  async addToCart(productId, quantity = 1) {
    return this.request('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    })
  }

  async updateCartItem(id, quantity) {
    return this.request(`/api/cart/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    })
  }

  async removeCartItem(id) {
    return this.request(`/api/cart/${id}`, {
      method: 'DELETE',
    })
  }

  // Orders
  async getOrders() {
    return this.request('/api/orders')
  }

  async getOrder(id) {
    return this.request(`/api/orders/${id}`)
  }

  async checkout(orderData) {
    return this.request('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  // Addresses
  async getAddresses() {
    return this.request('/api/addresses')
  }

  async addAddress(addressData) {
    return this.request('/api/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    })
  }

  // Articles
  async getArticles() {
    return this.request('/api/articles')
  }

  async getArticle(id) {
    return this.request(`/api/articles/${id}`)
  }

  // Reminders
  async getReminders() {
    return this.request('/api/reminders')
  }

  async addReminder(reminderData) {
    return this.request('/api/reminders', {
      method: 'POST',
      body: JSON.stringify(reminderData),
    })
  }
}

export const apiClient = new ApiClient()
