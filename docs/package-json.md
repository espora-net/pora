# `macos-editor/package.json` File

The `macos-editor/package.json` file defines the project's metadata, dependencies, and build scripts. Below is a description of its contents:

## Metadata

- `name`: The name of the project. In this case, it is `"macos-editor"`.
- `version`: The version of the project. In this case, it is `"1.0.0"`.
- `description`: A brief description of the project. In this case, it is `"A macOS editor based on Tiptap"`.
- `main`: The entry point of the project. In this case, it is `"main.js"`.

## Scripts

The `scripts` section defines the commands that can be run using `npm run <script-name>`. For the macOS editor, the following scripts are defined:

- `start`: Starts the Electron app. The command is `"electron ."`
- `build`: Builds the Electron app using `electron-builder`. The command is `"electron-builder"`

## Dependencies

The `dependencies` section lists the packages required for the project to run. For the macOS editor, the following dependencies are listed:

- `@tiptap/core`: The core package of Tiptap. The version is `"^2.0.0-beta.22"`.
- `@tiptap/starter-kit`: The starter kit for Tiptap. The version is `"^2.0.0-beta.22"`.
- `electron`: The Electron framework. The version is `"^13.1.7"`.

## DevDependencies

The `devDependencies` section lists the packages required for the development of the project. For the macOS editor, the following dev dependency is listed:

- `electron-builder`: A complete solution to package and build a ready-for-distribution Electron app. The version is `"^22.11.7"`.
