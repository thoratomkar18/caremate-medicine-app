import { http, HttpResponse } from 'msw'

// Mock data based on PDF specifications
const products = [
  {
    id: 1,
    name: 'Biofer-F',
    price: 50.13,
    originalPrice: 65.00,
    category: 'Vitamins & Supplements',
    image: '/images/biofer-f-specific.svg',
    description: 'Iron supplement for improved hemoglobin levels',
    inStock: true,
    rating: 4.5,
    reviews: 128,
    manufacturer: 'Biofer Pharma',
    composition: 'Iron, Folic Acid, Vitamin B12',
    benefits: ['Prevents anemia', 'Boosts energy', 'Supports pregnancy'],
    dosage: '1 tablet daily with food',
    sideEffects: 'May cause constipation in some cases'
  },
  {
    id: 2,
    name: 'VitaFol Multivitamins',
    price: 299.00,
    originalPrice: 350.00,
    category: 'Vitamins & Supplements',
    image: '/images/vitafol-multivitamins.svg',
    description: 'Complete multivitamin for daily nutrition',
    inStock: true,
    rating: 4.3,
    reviews: 89,
    manufacturer: 'VitaFol Health',
    composition: 'Vitamin A, B-Complex, C, D, E, Minerals',
    benefits: ['Daily nutrition', 'Immune support', 'Energy boost'],
    dosage: '1 tablet daily',
    sideEffects: 'Generally well tolerated'
  },
  {
    id: 3,
    name: 'Zincovit-C',
    price: 201.41,
    originalPrice: 250.00,
    category: 'Vitamins & Supplements',
    image: '/images/zincovit-c.svg',
    description: 'Zinc and Vitamin C for immune support',
    inStock: true,
    rating: 4.4,
    reviews: 156,
    manufacturer: 'Zincovit Labs',
    composition: 'Zinc, Vitamin C, Antioxidants',
    benefits: ['Immune support', 'Antioxidant protection', 'Skin health'],
    dosage: '1 tablet twice daily',
    sideEffects: 'May cause nausea if taken on empty stomach'
  },
  {
    id: 4,
    name: 'PhysiciansCare Antacid',
    price: 97.86,
    originalPrice: 120.00,
    category: 'Digestive Health',
    image: '/images/digestive-health.svg',
    description: 'Fast-acting antacid for heartburn relief',
    inStock: true,
    rating: 4.2,
    reviews: 203,
    manufacturer: 'PhysiciansCare',
    composition: 'Aluminum Hydroxide, Magnesium Hydroxide',
    benefits: ['Heartburn relief', 'Acid indigestion', 'Quick action'],
    dosage: '2-4 tablets as needed',
    sideEffects: 'May cause diarrhea with excessive use'
  },
  {
    id: 5,
    name: 'MULTILAC SYNBIOTYK',
    price: 124.96,
    originalPrice: 150.00,
    category: 'Digestive Health',
    image: '/images/digestive-health.svg',
    description: 'Probiotic supplement for gut health',
    inStock: false,
    rating: 4.6,
    reviews: 94,
    manufacturer: 'Multilac Health',
    composition: 'Lactobacillus, Bifidobacterium',
    benefits: ['Gut health', 'Digestive support', 'Immune boost'],
    dosage: '1 sachet daily',
    sideEffects: 'May cause mild bloating initially'
  },
  {
    id: 6,
    name: 'Albuesh Kapsul',
    price: 223.47,
    originalPrice: 280.00,
    category: 'Vitamins & Supplements',
    image: '/images/vitamin-supplement.svg',
    description: 'Albumin supplement for protein support',
    inStock: true,
    rating: 4.1,
    reviews: 67,
    manufacturer: 'Albuesh Pharma',
    composition: 'Albumin, Protein Complex',
    benefits: ['Protein support', 'Muscle health', 'Recovery aid'],
    dosage: '1 capsule twice daily',
    sideEffects: 'Generally well tolerated'
  },
  {
    id: 7,
    name: 'Blood Pressure Monitor',
    price: 780.00,
    originalPrice: 950.00,
    category: 'Medical Devices',
    image: '/images/bp-monitor.svg',
    description: 'Digital blood pressure monitor for home use',
    inStock: true,
    rating: 4.7,
    reviews: 234,
    manufacturer: 'HealthTech Devices',
    composition: 'Digital Display, Cuff, Air Pump',
    benefits: ['Home monitoring', 'Accurate readings', 'Memory function'],
    dosage: 'As needed for monitoring',
    sideEffects: 'None'
  },
  {
    id: 8,
    name: 'Thermometer',
    price: 900.00,
    originalPrice: 1100.00,
    category: 'Medical Devices',
    image: '/images/thermometer.svg',
    description: 'Digital infrared thermometer for body temperature',
    inStock: true,
    rating: 4.5,
    reviews: 189,
    manufacturer: 'TempCheck Medical',
    composition: 'Infrared Sensor, Digital Display',
    benefits: ['Non-contact measurement', 'Fast readings', 'Hygienic'],
    dosage: 'As needed for temperature check',
    sideEffects: 'None'
  },
  {
    id: 9,
    name: 'Mobility Vitamin Tablets',
    price: 156.89,
    originalPrice: 200.00,
    category: 'Vitamins & Supplements',
    image: '/images/vitamin-supplement.svg',
    description: 'Joint health and mobility support tablets',
    inStock: true,
    rating: 4.3,
    reviews: 112,
    manufacturer: 'Mobility Health',
    composition: 'Glucosamine, Chondroitin, MSM',
    benefits: ['Joint health', 'Mobility support', 'Pain relief'],
    dosage: '2 tablets daily',
    sideEffects: 'May cause mild stomach upset'
  },
  {
    id: 10,
    name: 'Omega-3 Fish Oil Capsules',
    price: 299.99,
    originalPrice: 399.99,
    category: 'Vitamins & Supplements',
    image: '/images/omega-3-fish-oil.svg',
    description: 'High-quality fish oil for heart and brain health',
    inStock: true,
    rating: 4.6,
    reviews: 245,
    manufacturer: 'Ocean Health',
    composition: 'EPA, DHA, Vitamin E',
    benefits: ['Heart health', 'Brain function', 'Anti-inflammatory'],
    dosage: '2 capsules daily with meals',
    sideEffects: 'May cause fishy aftertaste'
  },
  {
    id: 11,
    name: 'Hand Sanitizer 500ml',
    price: 89.99,
    originalPrice: 120.00,
    category: 'Personal Care',
    image: '/images/hand-sanitizer.svg',
    description: 'Alcohol-based hand sanitizer with moisturizers',
    inStock: true,
    rating: 4.4,
    reviews: 189,
    manufacturer: 'CleanCare',
    composition: '70% Ethyl Alcohol, Aloe Vera, Glycerin',
    benefits: ['Kills 99.9% germs', 'Moisturizing', 'Quick dry'],
    dosage: 'Apply as needed',
    sideEffects: 'May cause dryness with excessive use'
  },
  {
    id: 12,
    name: 'Digital Weighing Scale',
    price: 1299.00,
    originalPrice: 1599.00,
    category: 'Medical Devices',
    image: '/images/medical-device.svg',
    description: 'Digital body weight scale with BMI calculation',
    inStock: true,
    rating: 4.5,
    reviews: 156,
    manufacturer: 'HealthScale Pro',
    composition: 'Tempered Glass, Digital Display, Load Cells',
    benefits: ['Accurate readings', 'BMI calculation', 'Memory function'],
    dosage: 'Daily weight monitoring',
    sideEffects: 'None'
  },
  {
    id: 13,
    name: 'Paracetamol 500mg Tablets',
    price: 35.50,
    originalPrice: 45.00,
    category: 'Pain Relief',
    image: '/images/paracetamol-tablets.svg',
    description: 'Fast-acting pain relief and fever reducer',
    inStock: true,
    rating: 4.3,
    reviews: 324,
    manufacturer: 'MediCure Pharma',
    composition: 'Paracetamol 500mg',
    benefits: ['Pain relief', 'Fever reduction', 'Fast acting'],
    dosage: '1-2 tablets every 4-6 hours',
    sideEffects: 'Rare allergic reactions'
  },
  {
    id: 14,
    name: 'Baby Diaper Rash Cream',
    price: 179.99,
    originalPrice: 220.00,
    category: 'Baby Care',
    image: '/images/baby-care.svg',
    description: 'Gentle protective cream for baby\'s delicate skin',
    inStock: true,
    rating: 4.7,
    reviews: 198,
    manufacturer: 'BabySoft',
    composition: 'Zinc Oxide, Calendula, Chamomile',
    benefits: ['Prevents rash', 'Soothes irritation', 'Natural ingredients'],
    dosage: 'Apply after each diaper change',
    sideEffects: 'Generally safe for babies'
  },
  {
    id: 15,
    name: 'Glucose Monitoring Kit',
    price: 2499.00,
    originalPrice: 2999.00,
    category: 'Medical Devices',
    image: '/images/glucose-monitoring-kit.svg',
    description: 'Complete blood glucose monitoring system',
    inStock: true,
    rating: 4.6,
    reviews: 87,
    manufacturer: 'DiabetoCare',
    composition: 'Glucose Meter, Test Strips, Lancets',
    benefits: ['Accurate readings', 'Memory storage', 'Easy to use'],
    dosage: 'As recommended by physician',
    sideEffects: 'Minor pricking sensation'
  },
  {
    id: 16,
    name: 'Face Wash for Acne Control',
    price: 199.99,
    originalPrice: 249.99,
    category: 'Skin Care',
    image: '/images/skin-care.svg',
    description: 'Oil-free face wash with salicylic acid for acne-prone skin',
    inStock: true,
    rating: 4.4,
    reviews: 267,
    manufacturer: 'DermaClear',
    composition: 'Salicylic Acid, Niacinamide, Tea Tree Oil',
    benefits: ['Acne control', 'Oil-free', 'Gentle cleansing'],
    dosage: 'Use twice daily',
    sideEffects: 'May cause initial dryness'
  },
  {
    id: 17,
    name: 'Vitamin D3 60K IU Capsules',
    price: 299.00,
    originalPrice: 350.00,
    category: 'Vitamins & Supplements',
    image: '/images/vitamin-supplement.svg',
    description: 'High-potency Vitamin D3 for bone health',
    inStock: true,
    rating: 4.5,
    reviews: 145,
    manufacturer: 'SunVit Health',
    composition: 'Cholecalciferol 60,000 IU',
    benefits: ['Bone health', 'Immunity boost', 'Calcium absorption'],
    dosage: '1 capsule weekly or as directed',
    sideEffects: 'Overdose may cause hypercalcemia'
  },
  {
    id: 18,
    name: 'Antiseptic Wound Cream',
    price: 67.50,
    originalPrice: 85.00,
    category: 'First Aid',
    image: '/images/first-aid.svg',
    description: 'Antiseptic cream for minor cuts and wounds',
    inStock: true,
    rating: 4.2,
    reviews: 134,
    manufacturer: 'HealFast Medical',
    composition: 'Povidone Iodine, Neomycin',
    benefits: ['Prevents infection', 'Faster healing', 'Pain relief'],
    dosage: 'Apply 2-3 times daily on clean wound',
    sideEffects: 'May cause mild stinging initially'
  },
  {
    id: 19,
    name: 'Protein Powder Chocolate',
    price: 1599.00,
    originalPrice: 1999.00,
    category: 'Vitamins & Supplements',
    image: '/images/protein-powder-chocolate.svg',
    description: 'Whey protein powder for muscle building',
    inStock: true,
    rating: 4.6,
    reviews: 289,
    manufacturer: 'FitPro Nutrition',
    composition: 'Whey Protein Isolate, BCAA, Vitamins',
    benefits: ['Muscle building', 'Post-workout recovery', 'High protein'],
    dosage: '1 scoop with water/milk after workout',
    sideEffects: 'May cause bloating in lactose intolerant'
  },
  {
    id: 20,
    name: 'Nebulizer Machine',
    price: 3499.00,
    originalPrice: 4200.00,
    category: 'Medical Devices',
    image: '/images/medical-device.svg',
    description: 'Compressor nebulizer for respiratory treatments',
    inStock: true,
    rating: 4.4,
    reviews: 78,
    manufacturer: 'RespireCare',
    composition: 'Compressor, Nebulizer Cup, Tubing, Mask',
    benefits: ['Respiratory treatment', 'Easy to use', 'Quiet operation'],
    dosage: 'As prescribed by physician',
    sideEffects: 'None when used properly'
  },
  {
    id: 21,
    name: 'Baby Formula Milk Powder',
    price: 899.99,
    originalPrice: 1099.99,
    category: 'Baby Care',
    image: '/images/baby-care.svg',
    description: 'Nutritious infant formula for 0-6 months',
    inStock: true,
    rating: 4.5,
    reviews: 156,
    manufacturer: 'BabyNutri',
    composition: 'Proteins, Carbohydrates, Fats, Vitamins, Minerals',
    benefits: ['Complete nutrition', 'Easy digestion', 'DHA enriched'],
    dosage: 'As per feeding chart',
    sideEffects: 'May cause constipation initially'
  },
  {
    id: 22,
    name: 'Eye Drops for Dry Eyes',
    price: 189.99,
    originalPrice: 230.00,
    category: 'Eye Care',
    image: '/images/eye-care.svg',
    description: 'Lubricating eye drops for dry and irritated eyes',
    inStock: true,
    rating: 4.3,
    reviews: 201,
    manufacturer: 'VisionCare',
    composition: 'Sodium Hyaluronate, Polyethylene Glycol',
    benefits: ['Relieves dryness', 'Long-lasting', 'Preservative-free'],
    dosage: '1-2 drops in each eye as needed',
    sideEffects: 'Temporary blurred vision'
  },
  {
    id: 23,
    name: 'Muscle Pain Relief Gel',
    price: 149.99,
    originalPrice: 199.99,
    category: 'Pain Relief',
    image: '/images/pain-relief.svg',
    description: 'Topical gel for muscle and joint pain relief',
    inStock: false,
    rating: 4.4,
    reviews: 167,
    manufacturer: 'PainFree Solutions',
    composition: 'Diclofenac, Menthol, Camphor',
    benefits: ['Fast pain relief', 'Anti-inflammatory', 'Cooling effect'],
    dosage: 'Apply 3-4 times daily on affected area',
    sideEffects: 'May cause skin irritation'
  },
  {
    id: 24,
    name: 'Prenatal Vitamins',
    price: 599.99,
    originalPrice: 750.00,
    category: 'Vitamins & Supplements',
    image: '/images/prenatal-vitamins.svg',
    description: 'Complete prenatal vitamin complex for expecting mothers',
    inStock: true,
    rating: 4.7,
    reviews: 234,
    manufacturer: 'MomCare Health',
    composition: 'Folic Acid, Iron, Calcium, DHA, Vitamins',
    benefits: ['Fetal development', 'Maternal health', 'Neural tube support'],
    dosage: '1 tablet daily with food',
    sideEffects: 'May cause nausea'
  },
  {
    id: 25,
    name: 'Pulse Oximeter',
    price: 1499.00,
    originalPrice: 1899.00,
    category: 'Medical Devices',
    image: '/images/pulse-oximeter.svg',
    description: 'Fingertip pulse oximeter for oxygen saturation monitoring',
    inStock: true,
    rating: 4.5,
    reviews: 145,
    manufacturer: 'VitalCheck',
    composition: 'LED Display, Pulse Sensor, Battery',
    benefits: ['SpO2 monitoring', 'Pulse rate', 'Portable design'],
    dosage: 'Use as needed for monitoring',
    sideEffects: 'None'
  },
  {
    id: 26,
    name: 'Sunscreen SPF 50+',
    price: 399.99,
    originalPrice: 499.99,
    category: 'Skin Care',
    image: '/images/sunscreen-spf50.svg',
    description: 'Broad spectrum sunscreen for all skin types',
    inStock: true,
    rating: 4.6,
    reviews: 312,
    manufacturer: 'SunShield',
    composition: 'Zinc Oxide, Titanium Dioxide, Vitamin E',
    benefits: ['UV protection', 'Water resistant', 'Non-greasy'],
    dosage: 'Apply 30 minutes before sun exposure',
    sideEffects: 'May leave white residue'
  },
  {
    id: 27,
    name: 'Cough Syrup Sugar-Free',
    price: 125.99,
    originalPrice: 155.00,
    category: 'Cough & Cold',
    image: '/images/cough-cold.svg',
    description: 'Sugar-free cough syrup with honey and ginger',
    inStock: true,
    rating: 4.2,
    reviews: 189,
    manufacturer: 'CoughCare',
    composition: 'Dextromethorphan, Honey, Ginger Extract',
    benefits: ['Cough suppression', 'Natural ingredients', 'Sugar-free'],
    dosage: '2 teaspoons 3 times daily',
    sideEffects: 'May cause drowsiness'
  },
  {
    id: 28,
    name: 'First Aid Kit Complete',
    price: 799.99,
    originalPrice: 999.99,
    category: 'First Aid',
    image: '/images/first-aid.svg',
    description: 'Complete first aid kit for home and travel',
    inStock: true,
    rating: 4.5,
    reviews: 98,
    manufacturer: 'SafeCare Medical',
    composition: 'Bandages, Antiseptic, Gauze, Thermometer, Manual',
    benefits: ['Emergency ready', 'Compact design', 'Complete supplies'],
    dosage: 'Use as needed for first aid',
    sideEffects: 'None'
  },
  {
    id: 29,
    name: 'Calcium + Vitamin D Tablets',
    price: 249.99,
    originalPrice: 299.99,
    category: 'Vitamins & Supplements',
    image: '/images/vitamin-supplement.svg',
    description: 'Calcium supplement with Vitamin D for bone health',
    inStock: true,
    rating: 4.4,
    reviews: 178,
    manufacturer: 'BoneStrong',
    composition: 'Calcium Carbonate, Vitamin D3, Magnesium',
    benefits: ['Bone strength', 'Teeth health', 'Muscle function'],
    dosage: '2 tablets daily with meals',
    sideEffects: 'May cause constipation'
  },
  {
    id: 30,
    name: 'Baby Wet Wipes',
    price: 199.99,
    originalPrice: 249.99,
    category: 'Baby Care',
    image: '/images/baby-care.svg',
    description: 'Gentle baby wipes with aloe vera and chamomile',
    inStock: true,
    rating: 4.6,
    reviews: 267,
    manufacturer: 'BabyGentle',
    composition: 'Purified Water, Aloe Vera, Chamomile, Vitamin E',
    benefits: ['Gentle cleansing', 'Alcohol-free', 'Hypoallergenic'],
    dosage: 'Use as needed for cleaning',
    sideEffects: 'None for normal skin'
  }
]

const categories = [
  { id: 1, name: 'Vitamins & Supplements', icon: '💊' },
  { id: 2, name: 'Digestive Health', icon: '🫁' },
  { id: 3, name: 'Medical Devices', icon: '🩺' },
  { id: 4, name: 'Skin Care', icon: '🧴' },
  { id: 5, name: 'Pain Relief', icon: '💉' },
  { id: 7, name: 'Baby Care', icon: '👶' },
  { id: 8, name: 'Personal Care', icon: '🧼' },
  { id: 9, name: 'First Aid', icon: '🏥' },
  { id: 10, name: 'Eye Care', icon: '👁️' },
  { id: 11, name: 'Cough & Cold', icon: '🤧' }
]

const featuredProducts = products.slice(0, 6)
const popularProducts = products.filter(p => p.rating > 4.3)

const sampleUser = {
  id: 1,
  name: 'Rushikesh Kusmade',
  email: 'rushikesh@example.com',
  phone: '+91 77158 15914',
  addresses: [
    {
      id: 1,
      type: 'Home',
      name: 'Home Address',
      street: 'Baif Road',
      area: 'Wagholi',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '412207',
      phone: '+91 77158 15914',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'Office Address',
      street: 'IT Park',
      area: 'Hinjewadi',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411057',
      phone: '+91 77158 15914',
      isDefault: false
    }
  ]
}

const sampleOrder = {
  id: '4856214796',
  status: 'delivered',
  date: '2024-01-15',
  items: [
    { productId: 1, name: 'Biofer-F', quantity: 2, price: 50.13 },
    { productId: 3, name: 'Zincovit-C', quantity: 1, price: 201.41 }
  ],
  total: 301.67,
  deliveryAddress: sampleUser.addresses[0],
  paymentMethod: 'UPI',
  tracking: {
    status: 'delivered',
    timeline: [
      { status: 'ordered', date: '2024-01-15T10:00:00Z', message: 'Order placed successfully' },
      { status: 'confirmed', date: '2024-01-15T10:30:00Z', message: 'Order confirmed' },
      { status: 'packed', date: '2024-01-15T14:00:00Z', message: 'Order packed and ready for dispatch' },
      { status: 'shipped', date: '2024-01-15T16:00:00Z', message: 'Order dispatched from warehouse' },
      { status: 'out_for_delivery', date: '2024-01-16T09:00:00Z', message: 'Out for delivery' },
      { status: 'delivered', date: '2024-01-16T14:30:00Z', message: 'Order delivered successfully' }
    ]
  }
}

const articles = [
  {
    id: 1,
    title: '10 Essential Vitamins for Daily Health',
    excerpt: 'Discover the most important vitamins your body needs every day...',
    content: 'Full article content about essential vitamins...',
    author: 'Dr. Sarah Johnson',
    date: '2024-01-10',
    category: 'Nutrition',
    readTime: '5 min'
  },
  {
    id: 2,
    title: 'Managing Blood Pressure at Home',
    excerpt: 'Learn how to effectively monitor and manage your blood pressure...',
    content: 'Full article content about blood pressure management...',
    author: 'Dr. Michael Chen',
    date: '2024-01-08',
    category: 'Health Tips',
    readTime: '7 min'
  }
]

// Mock localStorage for cart, auth, and orders
let cart = []
let authToken = null
let currentUser = null
let orders = []

export const handlers = [
  // Products
  http.get('/api/products', () => {
    return HttpResponse.json(products)
  }),

  http.get('/api/products/:id', ({ params }) => {
    const product = products.find(p => p.id === parseInt(params.id))
    if (!product) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(product)
  }),

  http.get('/api/categories', () => {
    return HttpResponse.json(categories)
  }),

  http.get('/api/featured', () => {
    return HttpResponse.json(featuredProducts)
  }),

  http.get('/api/popular', () => {
    return HttpResponse.json(popularProducts)
  }),

  http.get('/api/search', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('q')
    
    if (!query) {
      return HttpResponse.json([])
    }
    
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    )
    
    return HttpResponse.json(filtered)
  }),

  // Authentication
  http.post('/api/auth/login', async ({ request }) => {
    try {
      const { email, password } = await request.json()
      console.log('MSW: Login attempt with:', { email, password })
      
      // Mock authentication - accept any email/password but create dynamic user profile
      let userName = 'User'
      let userPhone = '+91 98765 43210'
      
      if (email === 'rushikesh@example.com' && password === 'password') {
        console.log('MSW: Demo login successful')
        userName = 'Rushikesh Kusmade'
        userPhone = '+91 77158 15914'
      } else {
        console.log('MSW: Regular login successful')
        // Extract name from email (before @ symbol) and capitalize it
        const emailName = email.split('@')[0]
        userName = emailName.charAt(0).toUpperCase() + emailName.slice(1).replace(/[._]/g, ' ')
      }
      
      authToken = 'mock-jwt-token-' + Date.now()
      currentUser = { 
        ...sampleUser, 
        email,
        name: userName,
        phone: userPhone
      }
      
      const response = {
        token: authToken,
        user: currentUser,
        message: 'Login successful'
      }
      
      console.log('MSW: Login response:', response)
      return HttpResponse.json(response)
    } catch (error) {
      console.error('MSW: Login handler error:', error)
      return new HttpResponse(
        JSON.stringify({ message: 'Login failed', error: error.message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
  }),

  http.post('/api/auth/signup', async ({ request }) => {
    try {
      const userData = await request.json()
      console.log('MSW: Signup attempt with:', userData)
      
      authToken = 'mock-jwt-token-' + Date.now()
      currentUser = { 
        ...sampleUser, 
        ...userData,
        id: Date.now(), // Generate unique ID
        // Ensure we keep the user's actual data
        name: userData.name || userData.firstName + ' ' + (userData.lastName || ''),
        email: userData.email,
        phone: userData.phone || '+91 98765 43210'
      }
      
      console.log('MSW: Signup successful:', currentUser)
      return HttpResponse.json({
        token: authToken,
        user: currentUser,
        message: 'Signup successful'
      })
    } catch (error) {
      console.error('MSW: Signup handler error:', error)
      return new HttpResponse(
        JSON.stringify({ message: 'Signup failed', error: error.message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
  }),

  http.get('/api/auth/me', () => {
    if (!authToken) {
      return new HttpResponse(null, { status: 401 })
    }
    return HttpResponse.json(currentUser)
  }),

  // Cart
  http.get('/api/cart', () => {
    return HttpResponse.json(cart)
  }),

  http.post('/api/cart', async ({ request }) => {
    const { productId, quantity = 1 } = await request.json()
    const product = products.find(p => p.id === productId)
    
    if (!product) {
      return new HttpResponse(null, { status: 404 })
    }
    
    const existingItem = cart.find(item => item.productId === productId)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        id: Date.now(),
        productId,
        quantity,
        product: { ...product }
      })
    }
    
    return HttpResponse.json(cart)
  }),

  http.put('/api/cart/:id', async ({ params, request }) => {
    const { quantity } = await request.json()
    const item = cart.find(item => item.id === parseInt(params.id))
    
    if (!item) {
      return new HttpResponse(null, { status: 404 })
    }
    
    item.quantity = quantity
    
    if (item.quantity <= 0) {
      cart = cart.filter(item => item.id !== parseInt(params.id))
    }
    
    return HttpResponse.json(cart)
  }),

  http.delete('/api/cart/:id', ({ params }) => {
    cart = cart.filter(item => item.id !== parseInt(params.id))
    return HttpResponse.json(cart)
  }),

  // Orders
  http.get('/api/orders', () => {
    return HttpResponse.json([sampleOrder, ...orders])
  }),

  http.get('/api/orders/:id', ({ params }) => {
    // Check for sample order first
    if (params.id === '4856214796') {
      return HttpResponse.json(sampleOrder)
    }
    
    // Check for dynamic orders
    const order = orders.find(o => o.id === params.id)
    if (order) {
      return HttpResponse.json(order)
    }
    
    return new HttpResponse(null, { status: 404 })
  }),

  http.post('/api/checkout', async ({ request }) => {
    const orderData = await request.json()
    
    const newOrder = {
      id: Date.now().toString(),
      status: 'ordered',
      date: new Date().toISOString(),
      items: cart.map(item => ({
        productId: item.productId,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      total: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
      ...orderData,
      tracking: {
        status: 'ordered',
        timeline: [
          {
            status: 'ordered',
            date: new Date().toISOString(),
            message: 'Order placed successfully'
          }
        ]
      }
    }
    
    // Store the new order
    orders.push(newOrder)
    
    // Clear cart after successful checkout
    cart = []
    
    return HttpResponse.json(newOrder)
  }),

  // Addresses
  http.get('/api/addresses', () => {
    return HttpResponse.json(sampleUser.addresses)
  }),

  http.post('/api/addresses', async ({ request }) => {
    const addressData = await request.json()
    const newAddress = {
      id: Date.now(),
      ...addressData
    }
    sampleUser.addresses.push(newAddress)
    return HttpResponse.json(newAddress)
  }),

  // Articles
  http.get('/api/articles', () => {
    return HttpResponse.json(articles)
  }),

  http.get('/api/articles/:id', ({ params }) => {
    const article = articles.find(a => a.id === parseInt(params.id))
    if (!article) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(article)
  }),

  // Reminders
  http.get('/api/reminders', () => {
    return HttpResponse.json([])
  }),

  http.post('/api/reminders', async ({ request }) => {
    const reminderData = await request.json()
    return HttpResponse.json({ id: Date.now(), ...reminderData })
  })
]
