# Funcionalidad de la pantalla de bienvenida (Splash)

El archivo `macos-editor/main.js` incluye la funcionalidad para mostrar una pantalla de bienvenida (splash) al iniciar el editor de macOS. La pantalla de bienvenida se muestra durante 3 segundos antes de mostrar la ventana principal. El código relevante es el siguiente:

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
    }, 3000); // Mostrar splash durante 3 segundos
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
