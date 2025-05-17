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
