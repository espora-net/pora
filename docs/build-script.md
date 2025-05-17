# Build Script for macOS Editor

The `macos-editor/build.sh` script automates the build process for the macOS editor. It performs the following steps:

1. Installs dependencies using `npm install`.
2. Builds the Electron app using `npm run build`.
3. Compiles TypeScript files using `tsc`.
4. Creates the DMG installer using `npx electron-builder --mac`.

Below is the content of the `macos-editor/build.sh` script:

```bash
#!/bin/bash

# Ensure the script exits if any command fails
set -e

usage() {
  echo "Uso: $0 [local|dmg]"
  echo "  local  - Instala dependencias y construye la app Electron localmente"
  echo "  dmg    - Instala dependencias, construye la app y crea el instalador DMG"
  exit 1
}

if [ $# -ne 1 ]; then
  usage
fi

case "$1" in
  local)
    npm install
    npm run build
    npm start
    ;;
  dmg)
    npm install
    npm run build
    npx electron-builder --mac
    ;;
  *)
    usage
    ;;
esac
```
