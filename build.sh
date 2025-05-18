#!/bin/bash

# Script para ejecutar la aplicación localmente o generar un DMG.

# Comprobar el primer parámetro
MODE=$1

if [ -z "$MODE" ] || [ "$MODE" == "dev" ]; then
  echo "Iniciando en modo de desarrollo..."
  npm run electron:dev
elif [ "$MODE" == "dmg" ]; then
  echo "Generando DMG para macOS..."
  
  # Comprobar si estamos en macOS
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # Crear iconos para macOS si no existen
    if [ ! -f "build/icons/icon.icns" ]; then
      echo "Creando iconos para macOS..."
      ./create-icons.sh
    fi
    
    # Generar el DMG
    npm run build:dmg
  else
    echo "Error: La generación de DMG solo es posible en macOS."
    echo "Actualmente estás ejecutando en: $OSTYPE"
    echo "Para generar un DMG, necesitas ejecutar este script en un sistema macOS."
    exit 1
  fi
elif [ "$MODE" == "preview" ]; then
  echo "Iniciando vista previa de la aplicación..."
  npm run electron:preview
else
  echo "Uso: $0 [dev|dmg|preview]"
  echo "  dev    : Inicia la aplicación en modo de desarrollo (por defecto)."
  echo "  dmg    : Genera un archivo DMG para macOS."
  echo "  preview: Vista previa de la aplicación compilada."
  exit 1
fi
