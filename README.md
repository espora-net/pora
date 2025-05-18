# pora
My Personal editor

For detailed documentation, please refer to the [docs](docs/) directory.

# Project Overview

## Código fuente y estructura (Scaffolding)

El proyecto está organizado de la siguiente manera:

- **macos-editor/**
  - `index.html`: Archivo HTML principal donde se monta la app React.
  - `index.jsx`: Punto de entrada de React. Aquí se define el editor y la barra de herramientas usando Tiptap y React.
  - `bundle.js`: Bundle generado a partir de `index.jsx` usando esbuild. Es el archivo que carga el navegador/Electron.
  - `main.js`: Script principal de Electron. Controla la ventana principal, el splash y el menú de la app.
  - `renderer.js`: (Obsoleto) Lógica antigua del editor, ahora reemplazada por React.
  - `splash.html`: Pantalla de bienvenida (splash) mostrada al iniciar la app.
  - `build.sh`: Script para automatizar la instalación, build y empaquetado DMG.
  - `package.json`: Dependencias y scripts específicos del editor.
- **docs/**: Documentación detallada sobre instalación, dependencias, build, workflows, etc.
- **README.md**: Este archivo, con instrucciones rápidas y visión general.
- **package.json**: Configuración general del proyecto.

### Explicación de los archivos principales

- **index.html**: Define el contenedor `<div id="app"></div>` donde se monta la app React y carga el bundle generado.
- **index.jsx**: Contiene el componente principal de React, la configuración de Tiptap y la barra de herramientas.
- **main.js**: Inicializa la app Electron, gestiona ventanas, splash y menú.
- **build.sh**: Permite automatizar la instalación y build tanto para desarrollo como para generar el DMG.

# Instalación y uso funcional

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

Para más detalles, revisa la documentación en la carpeta `docs/`.

- [Workflow de release automático](docs/github-release.md): Explica cómo se construye y publica una release con el DMG usando GitHub Actions.
- [Condiciones de desarrollo / Development Conditions](docs/Copilot.md): Este archivo debe ser actualizado con cualquier decisión de diseño relevante, tipos de controles de interfaz de usuario, bibliotecas a utilizar y requisitos de idioma. Todos los colaboradores deben mantenerlo actualizado y seguir sus reglas para cada cambio.
