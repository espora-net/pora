# Project Overview

This project is organized as follows:

- **macos-editor/**
  - `index.html`: Main HTML file where the React app is mounted.
  - `index.jsx`: React entry point. Defines the editor and toolbar using Tiptap and React.
  - `bundle.js`: Bundle generated from `index.jsx` using esbuild. Loaded by the browser.
  - `build.sh`: Script to automate install, build, and DMG packaging.
  - `package.json`: Editor-specific dependencies and scripts.
- **docs/**: Detailed documentation about installation, dependencies, build, workflows, etc.
- **README.md**: This file, with quick instructions and project overview.
- **package.json**: General project configuration.

### Main files explained

- **index.html**: Defines the `<div id="app"></div>` container for React and loads the generated bundle.
- **index.jsx**: Contains the main React component, Tiptap configuration, and toolbar.
- **build.sh**: Automates install and build for both development and DMG generation.
