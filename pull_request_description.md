# 🌞 Light Mode Implementation & UI Fixes

## 📝 Description
This PR addresses **Issue #15** by implementing a fully functional **Light Mode** across the landing page and resolving assets loading issues.

The following changes were made:
- **Light Mode Theme**: Implemented a new color palette for light mode, ensuring high contrast and visual consistency.
- **Theme Toggle**: Added a theme toggle switch in the Header to switch between Dark and Light modes.
- **Component Styling**: Updated `Header`, `Footer`, `Hero`, `Features`, `CallToAction`, and `LogoTicker` to be theme-aware.
- **Favicon Fix**: 
    - Fixed broken favicon images in the Header and Footer by updating relative paths to absolute paths (`/favicon.ico`).
    - Resolved a `500 Internal Server Error` for the favicon by resolving a conflict between `src/app/favicon.ico` and `public/favicon.ico`.

## 🎨 Visuals
> (Please attach screenshots or a screen recording of the Light Mode and Theme Toggle here)

## ✅ Verification
- [x] Toggle switches correctly between Light and Dark modes.
- [x] All text is readable in both modes.
- [x] Favicon loads correctly without 500 errors.
- [x] Console is free of asset loading errors.

## 📁 Files Changed
- `src/app/globals.css`: Added CSS variables for light/dark themes.
- `src/sections/*.tsx`: Updated standard classes to use theme variables.
- `src/context/ThemeContext.tsx`: Added context for managing theme state.
- `src/sections/Header.tsx` & `src/sections/Footer.tsx`: Fixed favicon paths.
- `src/app/favicon.ico`: Removed duplicate file to fix build/server conflict.

## 🔗 Issue
Closes #15
