#!/bin/bash

# Script para ejecutar la aplicación localmente o generar un DMG.

# Comprobar el primer parámetro
MODE=$1

if [ -z "$MODE" ] || [ "$MODE" == "dev" ]; then
  echo "Iniciando en modo de desarrollo..."
  npm run dev
elif [ "$MODE" == "dmg" ]; then
  echo "Generando DMG para macOS..."
  npm run build:dmg
else
  echo "Uso: $0 [dev|dmg]"
  echo "  dev   : Inicia la aplicación en modo de desarrollo (por defecto)."
  echo "  dmg   : Genera un archivo DMG para macOS."
  exit 1
fi
