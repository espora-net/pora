# Archivo `macos-editor/package.json`

El archivo `macos-editor/package.json` define los metadatos del proyecto, dependencias y scripts de build. A continuación se describe su contenido:

## Metadatos

- `name`: Nombre del proyecto. En este caso, `"macos-editor"`.
- `version`: Versión del proyecto. En este caso, `"1.0.0"`.
- `description`: Breve descripción del proyecto. En este caso, `"A macOS editor based on Tiptap"`.
- `main`: Punto de entrada del proyecto. En este caso, `"main.js"`.

## Scripts

La sección `scripts` define los comandos que pueden ejecutarse con `npm run <script-name>`. Para el editor de macOS, se definen los siguientes scripts:

- `start`: Inicia la app Electron. El comando es `"electron ."`
- `build`: Construye la app Electron usando `electron-builder`. El comando es `"electron-builder"`

## Dependencias

La sección `dependencies` lista los paquetes necesarios para que el proyecto funcione. Para el editor de macOS, se incluyen:

- `@tiptap/core`: Paquete principal de Tiptap. Versión `"^2.0.0-beta.22"`.
- `@tiptap/starter-kit`: Starter kit de Tiptap. Versión `"^2.0.0-beta.22"`.
- `electron`: Framework Electron. Versión `"^13.1.7"`.

## DevDependencies

La sección `devDependencies` lista los paquetes necesarios para el desarrollo. Para el editor de macOS, se incluye:

- `electron-builder`: Solución completa para empaquetar y construir la app Electron lista para distribución. Versión `"^22.11.7"`.
