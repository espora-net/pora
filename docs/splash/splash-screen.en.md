# Splash Screen Functionality

The `macos-editor/main.js` file includes functionality for displaying a splash screen when the macOS editor is launched. The splash screen is displayed for 3 seconds before the main window is shown. The relevant code is as follows:

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
```
