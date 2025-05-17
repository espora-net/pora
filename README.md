# pora
My Personal editor

## macOS Editor based on Tiptap

This project includes a macOS editor based on the Tiptap library. The editor can be installed as a DMG file.

### Installation Instructions

1. Download the DMG file from the releases page.
2. Open the DMG file and drag the editor to your Applications folder.
3. Launch the editor from your Applications folder.

### Dependencies

The macOS editor is built using the following dependencies:
- [Tiptap](https://github.com/ueberdosis/tiptap)
- [Electron](https://www.electronjs.org/)

### Build Process for macOS Editor

To build the macOS editor, follow these steps:

1. Clone the repository.
2. Navigate to the `macos-editor` directory.
3. Run `npm install` to install the dependencies.
4. Run `npm run build` to build the Electron app.
5. Run `npx electron-builder --mac` to create the DMG installer.

### GitHub Actions Workflow for Building macOS Editor DMG

The project includes a GitHub Actions workflow for building the macOS editor DMG. The workflow is defined in the `.github/workflows/build.yml` file. It is triggered on pushes and pull requests to the `main` branch. The workflow performs the following steps:

1. Checks out the code.
2. Sets up Node.js.
3. Installs dependencies.
4. Builds the DMG.
5. Uploads the DMG as an artifact.

### `macos-editor/build.sh` Script

The `macos-editor/build.sh` script automates the build process for the macOS editor. It performs the following steps:

1. Installs dependencies using `npm install`.
2. Builds the Electron app using `npm run build`.
3. Creates the DMG installer using `npx electron-builder --mac`.

### `macos-editor/package.json` File

The `macos-editor/package.json` file defines the project's metadata and dependencies. It includes the following scripts for building the macOS editor:

- `start`: Starts the Electron app.
- `build`: Builds the Electron app using `electron-builder`.

### Splash Screen Functionality in `macos-editor/main.js`

The `macos-editor/main.js` file includes functionality for displaying a splash screen when the macOS editor is launched. The splash screen is displayed for 3 seconds before the main window is shown. The relevant code is as follows:

```javascript
function createSplashWindow() {
  const splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  splashWindow.loadFile('splash.html');
  return splashWindow;
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      splashWindow.close();
      mainWindow.show();
    }, 3000); // Show splash screen for 3 seconds
  });
}

let splashWindow;

app.on('ready', () => {
  splashWindow = createSplashWindow();
  createWindow();
});
```
