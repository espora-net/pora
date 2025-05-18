# pora
My Personal editor

For detailed documentation, please refer to the [docs](docs/) directory.

# Project Overview

- Project Overview ([English](docs/project-overview/project-overview.en.md), [Español](docs/project-overview/project-overview.es.md))

# Installation and Usage

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

## Generar instalador DMG para macOS

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
   El archivo DMG se generará en la carpeta `dist/`.

## Script automatizado

También puedes usar el script `build.sh`:

- Para desarrollo local:
  ```sh
  ./build.sh local
  ```
- Para generar el DMG:
  ```sh
  ./build.sh dmg
  ```

---

- [Installation instructions (English)](docs/installation/installation.en.md)
- [Instrucciones de instalación (Español)](docs/installation/installation.es.md)
- [GitHub Actions Release Workflow (English)](docs/release/github-release.en.md)
- [Workflow de Release con GitHub Actions (Español)](docs/release/github-release.es.md)
- [Development Conditions (Copilot.md)](docs/meta/Copilot.md): This file must be updated with any relevant design decisions, UI control types, libraries to use, and language requirements. All contributors must keep it up to date and follow its rules for every change.

For more details, check the documentation in the [docs](docs/) folder.
