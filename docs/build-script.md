# Build Script for macOS Editor

The `macos-editor/build.sh` script automates the build process for the macOS editor. It performs the following steps:

1. Installs dependencies using `npm install`.
2. Builds the Electron app using `npm run build`.
3. Creates the DMG installer using `npx electron-builder --mac`.

Below is the content of the `macos-editor/build.sh` script:

```bash
#!/bin/bash

# Ensure the script exits if any command fails
set -e

# Install dependencies
npm install

# Build the Electron app
npm run build

# Create the DMG installer
npx electron-builder --mac
```
