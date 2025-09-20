# CineVault - Movies Frontend App

A React application built with Vite, featuring Server-Side Rendering (SSR) support and a comprehensive SCSS design system. This is a complete recreation of the cineflow-boutique design and functionality using only SCSS (no Tailwind, CSS-in-JS, or CSS frameworks).

## Features

- ⚛️ React 18 with TypeScript
- 🚀 Vite for fast development and building
- 🎨 Comprehensive SCSS design system (no CSS frameworks)
- 🔄 Server-Side Rendering (SSR) support
- 🧭 React Router for client-side routing
- 📱 Responsive design with mobile-first approach
- 🎬 Film browsing with category-based carousels
- ❤️ Wishlist functionality with local state management
- 🎭 Category-specific theming (Action, Drama, Comedy)
- 🎨 Custom gradients, shadows, and animations
- 🔍 Film detail pages with comprehensive information
- 📊 Tanstack Query for data management
- 🎠 Embla Carousel for smooth film browsing
- 🔔 Toast notifications for user feedback

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.tsx      # Navigation header with wishlist
│   ├── Loading.tsx     # Loading spinner
│   └── ui/             # UI component library
│       ├── Button.tsx  # Custom button component
│       ├── Card.tsx    # Card wrapper component
│       ├── FilmCard.tsx # Film card with category theming
│       ├── FilmCarousel.tsx # Horizontal film carousel
│       └── Toaster.tsx # Toast notification system
├── pages/              # Page components
│   ├── Home.tsx        # Home page with film carousels
│   ├── MovieDetail.tsx # Individual film details
│   ├── Wishlist.tsx    # User's wishlist page
│   └── NotFound.tsx    # 404 error page
├── contexts/           # React contexts
│   └── WishlistContext.tsx # Wishlist state management
├── hooks/              # Custom React hooks
│   └── use-toast.ts    # Toast notification hook
├── services/           # API services
│   └── tmdb.ts         # TMDB API service with mock data
├── types/              # TypeScript type definitions
│   └── film.ts         # Film and wishlist types
├── styles/             # SCSS stylesheets
│   ├── variables.scss  # Design system variables
│   ├── reset.scss      # CSS reset and base styles
│   ├── components.scss # Component styles and utilities
│   └── main.scss       # Main stylesheet entry point
├── App.tsx             # Main app component with providers
├── entry-client.tsx    # Client-side entry point
└── entry-server.tsx    # Server-side entry point
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- TMDB API credentials (get them from [TheMovieDatabase](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd movies-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your TMDB API credentials
# VITE_TMDB_API_KEY=your_api_key_here
# VITE_TMDB_ACCESS_TOKEN=your_access_token_here
```

### Development

#### Client-side only (SPA mode)
```bash
npm run dev
```

#### With SSR (Server-Side Rendering)
```bash
npm run ssr:dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Running Production Build with SSR

```bash
npm run ssr:build
```

## Firebase Deployment

### Prerequisites for Firebase Deployment

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init hosting
```

### Setting up Environment Variables for Production

1. **For Firebase Hosting**, you need to set environment variables during build time:
```bash
# Create a production environment file
cp .env.production.example .env.production

# Edit .env.production with your production credentials
# VITE_TMDB_API_KEY=your_production_api_key
# VITE_TMDB_ACCESS_TOKEN=your_production_access_token
```

2. **Build and Deploy**:
```bash
# Build with production environment
npm run build:firebase

# Deploy to Firebase
firebase deploy
```

### Environment Variables Security

- ✅ **Local Development**: Use `.env` file (already in `.gitignore`)
- ✅ **Production**: Use `.env.production` file (already in `.gitignore`)
- ✅ **GitHub**: Only `.env.example` files are committed
- ✅ **Firebase**: Environment variables are built into the bundle at build time

**Important**: Never commit your actual API credentials to version control!

## Design System

This project features a comprehensive SCSS design system that replicates the cineflow-boutique design:

### Color System
- **Base Colors**: Dark theme with HSL color values for better manipulation
- **Category Colors**: 
  - Action: Red/orange gradients and accents
  - Drama: Purple/blue gradients and accents  
  - Comedy: Green/yellow gradients and accents
- **Semantic Colors**: Primary, secondary, muted, destructive, etc.

### Typography
- **Font Families**: Inter (sans), Playfair Display (serif), Fredoka One (display)
- **Responsive Sizing**: From xs (0.75rem) to 6xl (3.75rem)
- **Category-Specific Fonts**: Each film category uses different font families

### Components
- **Film Cards**: Category-themed with hover effects and gradients
- **Carousels**: Smooth horizontal scrolling with navigation controls
- **Buttons**: Multiple variants (default, outline, destructive, ghost)
- **Cards**: Consistent styling with shadows and borders

### Key Features:
- **No CSS Frameworks**: Pure SCSS implementation
- **No CSS-in-JS**: No Styled Components or similar libraries
- **No CSS Modules**: Traditional SCSS architecture
- **Category Theming**: Dynamic styling based on film categories
- **Responsive Design**: Mobile-first approach with breakpoints
- **Smooth Animations**: Custom transitions and hover effects
- **Utility Classes**: Comprehensive utility system for rapid development

## SSR Implementation

The application supports Server-Side Rendering through:

1. **Vite SSR Plugin**: Configured for React SSR
2. **Express Server**: Custom server implementation in `server.js`
3. **Entry Points**: Separate client and server entry points
4. **Hydration**: Client-side hydration for interactivity

## Available Scripts

- `npm run dev` - Start development server (SPA mode)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run ssr:dev` - Start development server with SSR
- `npm run ssr:build` - Build and start production server with SSR

## Technologies Used

- **React 18** - UI library with hooks and functional components
- **TypeScript** - Full type safety throughout the application
- **Vite** - Build tool and dev server with SSR support
- **React Router** - Client-side routing with nested routes
- **SCSS** - Comprehensive CSS preprocessing with variables and mixins
- **Express** - Custom SSR server implementation
- **Tanstack Query** - Data fetching and caching
- **Embla Carousel** - Smooth carousel functionality
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

## Architecture Decisions

1. **No Full-Stack Frameworks**: Built from scratch without Next.js or similar
2. **Custom SSR**: Hand-rolled SSR implementation for learning purposes
3. **Pure SCSS**: No CSS frameworks to demonstrate custom styling skills
4. **Component-Based**: Modular React component architecture with TypeScript
5. **State Management**: React Context for wishlist state
6. **Data Fetching**: Tanstack Query for efficient data management
7. **Category Theming**: Dynamic styling based on film categories
8. **Responsive Design**: Mobile-first approach with custom breakpoints
9. **Accessibility**: Focus management and semantic HTML
10. **Performance**: Lazy loading, optimized images, and efficient rendering
# Trigger deployment
