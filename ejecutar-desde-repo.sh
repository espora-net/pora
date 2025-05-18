#!/bin/bash

# Ir al directorio del proyecto (ajusta esta ruta a tu ubicación)
# cd /ruta/a/tu/proyecto/pora

# Descargar los últimos cambios
echo "Obteniendo últimos cambios del repositorio..."
git fetch origin

# Sobrescribir cambios locales (reemplaza 'main' con tu rama principal si es diferente)
echo "Sobrescribiendo cambios locales..."
git reset --hard origin/main

# Eliminar archivos no rastreados
echo "Limpiando archivos no rastreados..."
git clean -fd

# Instalar dependencias en caso de que hayan cambiado
echo "Instalando dependencias..."
npm install

# Ejecutar el proyecto
echo "Iniciando la aplicación..."
npm run dev
