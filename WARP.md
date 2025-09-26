# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

CareMate is a modern React-based medicine ordering application built with Vite and Tailwind CSS. It's a comprehensive e-commerce platform for health products with authentication, shopping cart, order management, and responsive mobile-first design.

## Development Commands

### Core Development
```bash
# Start development server (runs on port 3001)
npm run dev

# Build for production
npm run build

# Build for GitHub Pages deployment
npm run build:github

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Testing & Development
The application uses Mock Service Worker (MSW) for API simulation. All backend functionality is mocked and works locally without external dependencies.

**Demo Login Credentials:**
- Email: `rushikesh@example.com`
- Password: `password`

## Architecture Overview

### Core Structure
- **React 18** with Vite for fast development and building
- **React Router v6** for client-side routing with basename `/caremate-medicine-app`
- **Tailwind CSS** for styling with extensive custom configuration
- **MSW (Mock Service Worker)** for complete API simulation
- **React Query** for server state management
- **Context-based state** for authentication and cart management

### Key Architectural Patterns

#### Provider Hierarchy
```
QueryClientProvider
└── AuthProvider
    └── CartProvider
        └── Router (with basename for GitHub Pages)
```

#### State Management Strategy
- **Server State**: React Query for API data caching and synchronization
- **Authentication**: Context with localStorage persistence
- **Cart**: Context with localStorage persistence + optional server sync
- **Form State**: React Hook Form for complex forms
- **UI State**: Local component state with Headless UI components

#### Mock API System
The application uses MSW to simulate a complete backend:
- **Products**: 30+ healthcare products with realistic data
- **Authentication**: JWT token simulation with persistent sessions  
- **Cart & Orders**: Full e-commerce flow simulation
- **User Management**: Sample user profiles and addresses

#### Routing Architecture
- **Public Routes**: Login, Signup (standalone pages)
- **Protected Routes**: Checkout, Orders, Profile (require authentication)
- **Layout Routes**: Most pages use shared Layout component with Header, BottomNav, and CartDrawer
- **Dynamic Routes**: Product details (`/products/:id`), Order tracking (`/orders/:id`)

### Component Architecture

#### Layout Components
- **Layout**: Main layout wrapper with Header, BottomNav, and CartDrawer
- **Header**: Search, cart, profile/login navigation
- **BottomNav**: Mobile-optimized bottom navigation
- **CartDrawer**: Slide-out shopping cart with quantity management
- **ProtectedRoute**: Authentication wrapper for protected pages

#### Feature Components
- **ProductCard**: Reusable product display with add-to-cart functionality
- **Button/Input**: Base design system components with consistent styling
- **DebugInfo**: Development helper for debugging state and environment

#### Hook Architecture
- **useAuth**: Authentication state, login/signup/logout functionality
- **useCart**: Shopping cart management with localStorage persistence
- Both hooks provide context-based state management with error handling

### Data Flow Patterns

#### Authentication Flow
1. Login/Signup → API call via apiClient
2. Store JWT token in localStorage  
3. Update AuthContext state
4. Redirect to protected route or home

#### Cart Management Flow
1. Add item → Update local state immediately
2. Persist to localStorage
3. Sync with mock API (if authenticated)
4. Handle optimistic updates with error recovery

#### Product Discovery Flow
1. Home → Featured/Popular products via React Query
2. Search → Real-time filtering through products array
3. Categories → Filter by product category
4. Product Details → Individual product with add-to-cart

## File Structure Key Points

### Core Directories
- `src/components/`: Reusable UI components
- `src/pages/`: Route-specific page components
- `src/hooks/`: Custom React hooks for state management
- `src/services/`: API client and external service integrations
- `src/mocks/`: MSW handlers and mock data
- `public/images/`: Product images and assets

### Critical Configuration Files
- `vite.config.js`: Development server on port 3001, GitHub Pages base path
- `tailwind.config.js`: Extended design system with custom colors and utilities
- `postcss.config.js`: Tailwind CSS processing
- `package.json`: All development commands and dependencies

## Development Context

### Mock Data Specifications
The mock data in `src/mocks/handlers.js` includes:
- **Sample User**: "Rushikesh Kusmade" with Pune addresses
- **Sample Order**: Order ID "4856214796" with complete tracking timeline
- **Product Catalog**: 30+ products with realistic pricing (₹35.50 - ₹3499.00)
- **Categories**: Vitamins, Medical Devices, Baby Care, Personal Care, etc.

### Environment Configuration
- **Development**: MSW starts with service worker at `/mockServiceWorker.js`
- **Production**: MSW attempts to start with GitHub Pages path prefix
- **API Base**: Configurable via `VITE_API_URL` environment variable

### Responsive Design Strategy
- **Mobile-First**: Tailwind classes prioritize mobile experience
- **Bottom Navigation**: Primary mobile navigation pattern
- **Responsive Grid**: Products display adapts from 1-4 columns based on screen size
- **Touch-Friendly**: Large tap targets and mobile-optimized interactions

### GitHub Pages Deployment
The application is configured for GitHub Pages with:
- Base path `/caremate-medicine-app/` in router and Vite config
- Special build command `npm run build:github` that copies dist to docs folder
- MSW service worker path adjusted for production deployment

## Common Development Tasks

### Adding New Products
Modify the `products` array in `src/mocks/handlers.js` with required fields:
- id, name, price, originalPrice, category, image, description, inStock, rating, reviews

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route to `src/App.jsx` 
3. Wrap in `ProtectedRoute` if authentication required
4. Add to `BottomNav` if main navigation item

### Modifying Authentication
- Update mock authentication logic in `src/mocks/handlers.js`
- Modify `useAuth` hook for new authentication patterns
- Adjust `ProtectedRoute` component for authorization logic

### API Integration (Replacing MSW)
- Replace `apiClient` base URL and remove MSW initialization
- Update `useAuth` and `useCart` hooks to handle real API responses  
- Remove mock handlers and update error handling patterns

### Styling and Theme Updates
- Modify `tailwind.config.js` for design system changes
- Update custom CSS classes and component styling
- Maintain mobile-first responsive design principles