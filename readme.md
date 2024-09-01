# MiConta App

This project is built using the [React Native Boilerplate](https://github.com/thecodingmachine/react-native-boilerplate) by TheCodingMachine, customized for take home test submission.

## Table of Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Useful Commands](#useful-commands)
- [Test Results](#test-results)
- [Demo App](#demo-app)
- [Evidence Video](#evidence-video)

## Requirements

- **Java Development Kit (JDK):** Zulu 17
- **Node.js:** v20.9.0
- **Yarn:** 3.6.4

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aqigif/MiConta.git
   cd MiConta
   ```

2. **Install dependencies:**

   Ensure you are using Node 20 and Yarn:

   ```bash
   yarn install
   ```

## Running the App

1. **Start the Metro Bundler:**

   ```bash
   yarn start
   ```

2. **Run the app on Android:**

   Ensure you have an Android emulator running or a device connected:

   ```bash
   yarn android
   ```

3. **Run the app on iOS:**

   Ensure you have an iOS simulator running or a device connected:

   ```bash
   yarn ios
   ```

## Project Structure

The project structure follows best practices and is organized as follows:

```bash
MICONTA/
├── android/              # Contains Android-specific code, configurations, and build files.
├── ios/                  # Contains iOS-specific code, configurations, and build files.
├── patches/              # Stores patch files created by `patch-package` to fix issues in dependencies.
├── src/                  # Main source directory containing all the application's code.
│   ├── components/       # Reusable UI components that are used throughout the app.
│   ├── hooks/            # Custom React hooks for managing state and logic in a reusable manner.
│   ├── navigators/       # Contains navigation configurations and setups using libraries like React Navigation.
│   ├── screens/          # Individual screen components representing different pages or views in the app.
│   ├── services/         # Service functions for API calls, data fetching, and other side effects.
│   ├── stores/           # State management logic, possibly using libraries like Redux or Zustand.
│   ├── theme/            # Theme-related files for styling and theming the application.
│   │   ├── assets/       # Static assets such as icons and images used in the theme.
│   │   │   ├── icons/    # Icon assets used across the app.
│   │   │   └── images/   # Image assets used across the app.
│   │   ├── useTheme.ts   # Custom hook for accessing and manipulating theme settings.
│   ├── translations/     # Localization files for supporting multiple languages.
│   ├── types/            # TypeScript type definitions for enhancing type safety throughout the app.
│   ├── utils/            # Utility functions and helpers used throughout the application.
│   └── App.tsx           # Entry point of the React Native app where the main component is defined.
└── index.js              # Entry point for initializing the app, setting up any initial configuration or startup logic.

```

## Available Scripts
- **`yarn start`**: Start the Metro Bundler.
- **`yarn android`**: Run the app on an Android emulator or device.
- **`yarn ios`**: Run the app on an iOS simulator or device.
- **`yarn test`**: Run the test suite.
- **`yarn lint`**: Lint the codebase using ESLint.
- **`yarn type-check`**: Run TypeScript type checking.
- **`yarn pod-install`**: Install iOS dependencies using CocoaPods.
- **`yarn postinstall`**: Apply patches after installing packages.

## Test Results
Some functionality on this application has been tested. Below are the test results:

```bash
➜  MiConta git:(main) ✗ yarn test
 PASS  src/stores/actions/contact_action/contact_action.test.ts
 PASS  src/theme/ThemeProvider/ThemeProvider.test.tsx
 PASS  src/components/molecules/Brand/Brand.test.tsx
 PASS  src/stores/reducers/contact_reducer/contact_list.reducer.test.ts
 PASS  src/stores/reducers/contact_reducer/contact_favorite.reducer.test.ts
 PASS  src/stores/reducers/contact_reducer/contact_detail.reducer.test.ts
 PASS  src/utils/string.test.ts

Test Suites: 7 passed, 7 total
Tests:       30 passed, 30 total
Snapshots:   0 total
Time:        1.453 s
Ran all test suites.
```

## Useful Commands

- **Clean Build for Android:**

  ```bash
  cd android && ./gradlew clean
  cd ..
  yarn android
  ```

- **Clean Build for iOS:**

  ```bash
  cd ios && xcodebuild clean
  cd ..
  yarn ios
  ```

## Demo


Watch a video demonstrating the features and functionality of the MiConta App:

[![Demo MiConta](https://img.youtube.com/vi/ez7qgcawKbI/0.jpg)](https://www.youtube.com/watch?v=ez7qgcawKbI)

or You can try a MiConta App direcly (Android Only) [here](https://github.com/aqigif/MiConta/releases/tag/1.0).  
