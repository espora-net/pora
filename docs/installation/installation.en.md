# Installation Instructions

## Prerequisites
- Node.js >= 16
- npm >= 7

## Local Installation and Run

1. Open a terminal and go to the `macos-editor` folder:
   ```sh
   cd macos-editor
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React Native macOS app:
   ```sh
   npx react-native run-macos
   ```

## Build DMG for macOS

1. Make sure dependencies are installed:
   ```sh
   npm install
   ```
2. Build the React Native macOS app:
   ```sh
   npx react-native run-macos --configuration Release
   ```

## Automated Script

You can use the script:

- For local development:
  ```sh
  ./build.sh dev
  ```
- To generate the DMG:
  ```sh
  ./build.sh dmg
  ```
