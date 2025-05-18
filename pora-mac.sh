#!/bin/bash

# Script para ejecutar Pora Editor desde el repositorio (Mac version)
# Autor: Carlos de Huerta

# Colores para mejor visualización
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Muestra un mensaje con formato
echo_message() {
  echo -e "${BLUE}[PORA]${NC} $1"
}

# Muestra un mensaje de error
echo_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Verifica si estamos en el directorio del proyecto, si no, cambiar al directorio especificado
PROJECT_DIR="$HOME/path/to/pora"  # MODIFICA ESTA RUTA a la ubicación de tu proyecto

if [[ "$PWD" != *"pora"* ]]; then
  echo_message "${YELLOW}No estamos en el directorio del proyecto. Cambiando a $PROJECT_DIR${NC}"
  cd "$PROJECT_DIR" || { echo_error "No se pudo cambiar al directorio del proyecto"; exit 1; }
fi

# Verifica si git está disponible
if ! command -v git &> /dev/null; then
  echo_error "Git no está instalado o no está en el PATH. Por favor, instala Git."
  exit 1
fi

# Verifica si npm está disponible
if ! command -v npm &> /dev/null; then
  echo_error "npm no está instalado o no está en el PATH. Por favor, instala Node.js y npm."
  exit 1
fi

# Guarda la rama actual
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo_message "Rama actual: ${GREEN}$CURRENT_BRANCH${NC}"

# Descargar los últimos cambios
echo_message "Obteniendo últimos cambios del repositorio..."
git fetch origin || { echo_error "No se pudo obtener los últimos cambios"; exit 1; }

# Verifica si hay cambios locales no commiteados
if [[ -n $(git status --porcelain) ]]; then
  echo_message "${YELLOW}Hay cambios locales no commiteados.${NC}"
  read -p "¿Descartar todos los cambios locales? (s/n): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo_message "Sobrescribiendo cambios locales..."
    git reset --hard "origin/$CURRENT_BRANCH" || { echo_error "No se pudo hacer reset"; exit 1; }
    git clean -fd || { echo_error "No se pudo limpiar los archivos no rastreados"; exit 1; }
  else
    echo_message "Continuando con los cambios locales."
  fi
else
  echo_message "No hay cambios locales, actualizando a la última versión..."
  git reset --hard "origin/$CURRENT_BRANCH" || { echo_error "No se pudo hacer reset"; exit 1; }
fi

# Instalar o actualizar dependencias
echo_message "Instalando dependencias..."
npm install || { echo_error "No se pudo instalar las dependencias"; exit 1; }

# Ejecutar el proyecto usando npx para evitar problemas de PATH
echo_message "Iniciando la aplicación..."
if command -v npx &> /dev/null; then
  echo_message "Usando npx para iniciar vite..."
  npx vite
else
  echo_message "npx no disponible, usando npm run..."
  npm run dev
fi
