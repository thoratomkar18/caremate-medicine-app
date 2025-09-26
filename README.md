# CareMate - Medicine Ordering App

A modern, responsive React application for ordering medicines and health products with a clean, intuitive interface built with Tailwind CSS.

## 🚀 Features

- **User Authentication** - Secure login/signup with JWT tokens
- **Product Catalog** - Browse medicines and health products with categories
- **Shopping Cart** - Add items, manage quantities, and persist cart data
- **Order Management** - Place orders, track delivery, and view order history
- **Search & Filters** - Find products quickly with advanced search and filtering
- **Responsive Design** - Mobile-first design that works on all devices
- **Mock API** - Complete backend simulation with MSW (Mock Service Worker)
- **Local Storage** - Persistent cart and authentication data

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS v3+
- **Routing**: React Router v6
- **State Management**: React Query for server state
- **Forms**: React Hook Form
- **UI Components**: Headless UI + Custom components
- **Animations**: Framer Motion
- **Mocking**: MSW (Mock Service Worker)
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd caremate-medicine-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📱 Pages & Features

### Public Pages
- **Home** - Featured products, categories, popular items
- **Login/Signup** - User authentication
- **Product List** - Browse and filter products
- **Product Details** - Detailed product information
- **Help** - FAQ and support information
- **Articles** - Health and wellness articles

### Protected Pages (Requires Authentication)
- **Checkout** - Order placement with address and payment
- **Orders** - Order history and status
- **Track Order** - Real-time order tracking
- **Profile** - User information and address management

## 🎨 Design System

The app uses a comprehensive design system with:

- **Colors**: Primary, muted, accent, success, warning, error palettes
- **Typography**: Inter font family with consistent sizing
- **Components**: Reusable Button, Input, ProductCard, CartDrawer, Header
- **Animations**: Subtle transitions and micro-interactions
- **Responsive**: Mobile-first approach with breakpoints

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
```

### Tailwind Configuration
The app includes a custom Tailwind config with:
- Extended color palette
- Custom animations
- Component classes
- Responsive utilities

## 📊 Mock Data

The app includes comprehensive mock data based on the PDF specifications:

- **Products**: 9+ products with real pricing (Biofer-F ₹50.13, VitaFol ₹299.00, etc.)
- **User Data**: Sample user "Rushikesh Kusmade" with phone "+91 77158 15914"
- **Addresses**: Home (Wagholi, Pune) and Office (Hinjewadi, Pune)
- **Sample Order**: Order ID "4856214796" with tracking timeline

## 🛒 Shopping Features

- **Add to Cart** - Click product cards or use dedicated buttons
- **Cart Drawer** - Slide-out cart with quantity management
- **Checkout Flow** - Address selection, payment method, order confirmation
- **Order Tracking** - Timeline-based tracking with status updates
- **Search** - Real-time product search with fuzzy matching

## 🔐 Authentication

- **Login/Signup** - Email and password authentication
- **JWT Tokens** - Secure token-based authentication
- **Protected Routes** - Automatic redirect to login for protected pages
- **Demo Login** - Quick access with demo credentials

## 📱 Mobile Experience

- **Bottom Navigation** - Easy access to main sections
- **Touch-Friendly** - Optimized for mobile interactions
- **Responsive Images** - Adaptive image sizing
- **Mobile-First** - Designed primarily for mobile users

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch
```

## 📝 API Endpoints

The app uses MSW to mock the following API endpoints:

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `GET /api/categories` - Get product categories
- `GET /api/search?q=...` - Search products

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Get current user

### Cart & Orders
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart
- `POST /api/checkout` - Place order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

### Additional
- `GET /api/addresses` - Get user addresses
- `POST /api/addresses` - Add new address
- `GET /api/articles` - Get health articles

## 🚀 Deployment

The app can be deployed to any static hosting service:

1. **Build the project**: `npm run build`
2. **Deploy the `dist` folder** to your hosting service
3. **Configure environment variables** if needed

### Recommended Hosting
- **Vercel** - Zero-config deployment
- **Netlify** - Easy static site hosting
- **GitHub Pages** - Free hosting for public repos

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce and health apps
- Icons from Lucide React
- Animations powered by Framer Motion
- Mock data based on real medicine pricing and information

---

**CareMate** - Your health, our priority. Built with ❤️ using React and Tailwind CSS.
