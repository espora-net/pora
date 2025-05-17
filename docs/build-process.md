# Build Process for macOS Editor

To build the macOS editor, follow these steps:

1. Clone the repository.
2. Navigate to the `macos-editor` directory.
3. Run `npm install` to install the dependencies.
4. Run `npm run build` to build the Electron app.
5. Run `npx electron-builder --mac` to create the DMG installer.
6. Run `tsc` to compile the TypeScript files.
7. Use SCSS for styling the application.
