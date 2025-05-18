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
3. Inicia la aplicación React Native macOS:
   ```sh
   npx react-native run-macos
   ```

## Generar DMG para macOS

1. Asegúrate de tener las dependencias instaladas:
   ```sh
   npm install
   ```
2. Construye la aplicación React Native macOS:
   ```sh
   npx react-native run-macos --configuration Release
   ```

## Script automatizado

Puedes usar el script:

- Para desarrollo local:
  ```sh
  ./build.sh dev
  ```
- Para generar el DMG:
  ```sh
  ./build.sh dmg
  ```
