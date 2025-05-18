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
3. Build the React bundle:
   ```sh
   npx esbuild ./index.jsx --bundle --outfile=./bundle.js --format=iife
   ```
4. Start the Electron app:
   ```sh
   npm start
   ```

## Build DMG for macOS

1. Make sure dependencies are installed:
   ```sh
   npm install
   ```
2. Build the React bundle:
   ```sh
   npx esbuild ./index.jsx --bundle --outfile=./bundle.js --format=iife
   ```
3. Build the DMG:
   ```sh
   npm run build
   npx electron-builder --mac
   ```
   The DMG file will be in the `dist/` folder.

## Automated Script

You can use the script:

- For local development:
  ```sh
  ./build.sh local
  ```
- To generate the DMG:
  ```sh
  ./build.sh dmg
  ```
