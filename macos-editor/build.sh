#!/bin/bash

# Ensure the script exits if any command fails
set -e

# Install dependencies
npm install

# Build the Electron app
npm run build

# Create the DMG installer
npx electron-builder --mac
