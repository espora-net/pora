# Installation Instructions

## Ejecución local

1. Navega a la carpeta `macos-editor`:
   ```sh
   cd macos-editor
   ```
2. Instala dependencias:
   ```sh
   npm install
   ```
3. Genera el bundle de React:
   ```sh
   npx esbuild ./index.jsx --bundle --outfile=./bundle.js --format=iife
   ```
4. Inicia la app:
   ```sh
   npm start
   ```

## Generar DMG para macOS

1. Instala dependencias:
   ```sh
   npm install
   ```
2. Genera el bundle de React:
   ```sh
   npx esbuild ./index.jsx --bundle --outfile=./bundle.js --format=iife
   ```
3. Construye el DMG:
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
