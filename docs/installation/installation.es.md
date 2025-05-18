# Instrucciones de instalación

## Requisitos previos
- Node.js >= 16
- npm >= 7

## Instalación y ejecución local

1. Abre una terminal y navega a la carpeta `macos-editor`:
   ```sh
   cd macos-editor
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Genera el bundle de React:
   ```sh
   npx esbuild ./index.jsx --bundle --outfile=./bundle.js --format=iife
   ```
4. Inicia la aplicación Electron:
   ```sh
   npm start
   ```

## Generar DMG para macOS

1. Asegúrate de tener las dependencias instaladas:
   ```sh
   npm install
   ```
2. Genera el bundle de React:
   ```sh
   npx esbuild ./index.jsx --bundle --outfile=./bundle.js --format=iife
   ```
3. Construye el instalador DMG:
   ```sh
   npm run build
   npx electron-builder --mac
   ```
   El archivo DMG estará en la carpeta `dist/`.

## Script automatizado

Puedes usar el script:

- Para desarrollo local:
  ```sh
  ./build.sh local
  ```
- Para generar el DMG:
  ```sh
  ./build.sh dmg
  ```
