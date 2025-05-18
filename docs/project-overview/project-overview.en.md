# Project Overview

This project is organized as follows:

- **macos-editor/**
  - `index.html`: Main HTML file where the React app is mounted.
  - `index.jsx`: React entry point. Defines the editor and toolbar using Tiptap and React.
  - `bundle.js`: Bundle generated from `index.jsx` using esbuild. Loaded by the browser/Electron.
  - `main.js`: Main Electron script. Controls the main window, splash, and app menu.
  - `renderer.js`: (Obsolete) Old editor logic, now replaced by React.
  - `splash.html`: Splash screen shown at app startup.
  - `build.sh`: Script to automate install, build, and DMG packaging.
  - `package.json`: Editor-specific dependencies and scripts.
- **docs/**: Detailed documentation about installation, dependencies, build, workflows, etc.
- **README.md**: This file, with quick instructions and project overview.
- **package.json**: General project configuration.

### Main files explained

- **index.html**: Defines the `<div id="app"></div>` container for React and loads the generated bundle.
- **index.jsx**: Contains the main React component, Tiptap configuration, and toolbar.
- **main.js**: Initializes the Electron app, manages windows, splash, and menu.
- **build.sh**: Automates install and build for both development and DMG generation.
