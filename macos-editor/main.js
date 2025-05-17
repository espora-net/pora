const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Establece el nombre de la aplicación según package.json (solo tiene efecto en macOS)
if (app.setName && require('./package.json').productName) {
  app.setName(require('./package.json').productName);
}

// Crear un menú de ejemplo personalizado
const exampleMenuTemplate = [
  {
    label: 'Ejemplo',
    submenu: [
      {
        label: 'Acerca de',
        click: () => {
          // Puedes mostrar un diálogo o realizar otra acción aquí
        }
      },
      { type: 'separator' },
      { role: 'quit', label: 'Salir' }
    ]
  }
];

const exampleMenu = Menu.buildFromTemplate(exampleMenuTemplate);
Menu.setApplicationMenu(exampleMenu);

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
  const packageJson = require('./package.json');
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    title: packageJson.productName, // Establece el título de la ventana principal
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
