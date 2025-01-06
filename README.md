# Eco-Friendly Urban Mobility App

A sustainable urban mobility solution that offers bike rental services through a modern, user-friendly React Native mobile application.

## Features

### User Authentication
- Complete authentication flow with Register and Login screens
- Form validation with error handling
- Secure password management
- AsyncStorage for local data persistence
- Password visibility toggle
- Forgot password functionality (UI implemented)

### Getting Started Screen
- Animated welcome interface
- Feature showcase with icons
- Clean, modern dark theme design
- Smooth navigation to registration

### Home Screen
- Real-time bike availability tracking
- Multiple bike types:
  - City Bikes
  - Electric Bikes
  - Mountain Bikes
  - Cargo Bikes
- Detailed bike information:
  - Battery level indicators
  - Pricing per hour
  - Status tracking (available/rented/charging)
  - Location information
- Pull-to-refresh functionality
- Ride counter
- User statistics dashboard

## Technical Stack

### Core Technologies
- React Native
- TypeScript
- React Navigation
- AsyncStorage

### UI Components
- Custom animated components
- Responsive layouts
- Platform-specific styling (iOS/Android)
- Status bar integration

### Features Implementation
- Context API for state management
- Axios for API integration
- Custom hooks for business logic
- Responsive image handling
- Form validation
- Error handling

## Project Structure

```
src/
├── assets/
│   ├── GetStarted_pic.webp
│   ├── Login_pic.webp
│   └── Register_pic.webp
├── navigation/
│   └── types.ts
├── context/
│   └── CountContext.ts
└── screens/
    ├── GetStartedScreen.tsx
    ├── HomeScreen.tsx
    ├── LoginScreen.tsx
    └── RegisterScreen.tsx
```

## Screen Details

### GetStartedScreen
- Welcome interface with animated transitions
- Feature showcase
- Navigation to registration flow
- Responsive design with platform-specific adjustments

### LoginScreen
- Email and password authentication
- Form validation
- Error handling
- Navigation to registration
- Password visibility toggle
- Forgot password option

### RegisterScreen
- New user registration
- Comprehensive form validation
- Password confirmation
- Error feedback
- Navigation to login

### HomeScreen
- Dynamic bike listing
- Status indicators
- Battery level monitoring
- Price display
- Refresh functionality
- User statistics
- Ride counter

## Styling

The app uses a consistent dark theme with the following color scheme:
- Background: `#000000` (Black)
- Primary: `#1e3a8a` (Medium Blue)
- Secondary: `#0f172a` (Dark Blue)
- Accent: `#3b82f6` (Bright Blue)
- Text: `#FFFFFF` (White)
- Subtle Text: `#93c5fd` (Light Blue)
- Error: `#ef4444` (Red)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```
4. Run on iOS:
   ```bash
   npx pod-install ios
   npx react-native run-ios
   ```
5. Run on Android:
   ```bash
   npx react-native run-android
   ```

## Development Requirements

- Node.js 14 or higher
- React Native CLI
- iOS: XCode 12 or higher (for iOS development)
- Android: Android Studio (for Android development)
- TypeScript 4.x

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
