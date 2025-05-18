# Descripción general del proyecto

Este proyecto está organizado de la siguiente manera:

- **macos-editor/**
  - `index.html`: Archivo HTML principal donde se monta la app React.
  - `index.jsx`: Punto de entrada de React. Aquí se define el editor y la barra de herramientas usando Tiptap y React.
  - `bundle.js`: Bundle generado a partir de `index.jsx` usando esbuild. Es el archivo que carga el navegador.
  - `build.sh`: Script para automatizar la instalación, build y empaquetado DMG.
  - `package.json`: Dependencias y scripts específicos del editor.
- **docs/**: Documentación detallada sobre instalación, dependencias, build, workflows, etc.
- **README.md**: Este archivo, con instrucciones rápidas y visión general.
- **package.json**: Configuración general del proyecto.

### Explicación de los archivos principales

- **index.html**: Define el contenedor `<div id="app"></div>` donde se monta la app React y carga el bundle generado.
- **index.jsx**: Contiene el componente principal de React, la configuración de Tiptap y la barra de herramientas.
- **build.sh**: Permite automatizar la instalación y build tanto para desarrollo como para generar el DMG.
