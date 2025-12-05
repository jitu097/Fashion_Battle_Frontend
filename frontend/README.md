# Fashion Battle - Frontend Only

A modern fashion social media and e-commerce platform built entirely as a frontend application with no backend dependencies.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

**Note:** This is a **frontend-only** application. All data is stored in localStorage - no backend server required!

## ✅ What's Done

### Pages
- **Landing** - Animated logo page with auto-redirect
- **Login/Signup** - Authentication pages with gradient backgrounds (uses localStorage)
- **Home** - Social feed with posts, likes, comments
- **Shop** - E-commerce page with products, categories, trust badges
- **Profile** - User profile management with local storage

### Components
- **Navbar** - Reusable navigation with logo image (used on all main pages)
- **PostCard** - Social media post display
- **Profile Components** - Edit profile, settings, cart, orders, wishlist, etc.

### Features
- ✅ React Router navigation
- ✅ Colorful gradient UI
- ✅ Responsive design
- ✅ Clean, organized code structure
- ✅ **Frontend-only authentication** (localStorage based)
- ✅ **No backend required** - all data persists in browser
- ✅ Mock API with realistic delays

## 📁 Structure

```
src/
├── api/            # Mock API (localStorage based)
├── components/     # Reusable components (Navbar, Profile, etc.)
├── context/        # Auth context for user management
├── pages/          # Page components (Landing, Auth, Home, Shop)
├── assets/         # Images and icons (logo.svg)
├── utils/          # Utility functions
└── App.jsx         # Main routing
```

## 🛠 Tech Stack

React 18 • Vite • React Router • Framer Motion • Tailwind CSS • Material-UI

## 📝 How It Works

- **Authentication:** User accounts stored in localStorage
- **User Data:** Profile information persists in browser storage
- **No Server Needed:** Everything runs client-side
- **Mock API:** Simulates API calls with delays for realistic UX

---

### React + Vite Template Info

This template uses:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) with Babel for Fast Refresh
- ESLint for code quality

### Expanding ESLint Configuration

For production apps, enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
