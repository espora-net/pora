const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const packageJson = require('./package.json');

// Establece el nombre de la aplicación según package.json (solo tiene efecto en macOS)
if (app.setName && packageJson.productName) {
  app.setName(packageJson.productName);
}

// Menú personalizado con atajos y orden estándar
const isMac = process.platform === 'darwin';
const appName = packageJson.productName || 'Pora';

const menuTemplate = [
  // App menu (solo en Mac)
  ...(isMac ? [{
    label: appName,
    submenu: [
      {
        label: `About ${appName}`,
        role: 'about'
      },
      {
        label: 'Settings…',
        accelerator: 'CmdOrCtrl+,',
        click: () => {
          // Aquí puedes abrir una ventana de configuración
        }
      },
      { type: 'separator' },
      {
        label: `Quit ${appName}`,
        role: 'quit',
        accelerator: 'CmdOrCtrl+Q'
      }
    ]
  }] : []),
  // File menu
  {
    label: 'File',
    submenu: [
      {
        label: 'New File',
        accelerator: 'CmdOrCtrl+N',
        click: () => {
          // Acción para nuevo archivo
        }
      },
      {
        label: 'Open…',
        accelerator: 'CmdOrCtrl+O',
        click: () => {
          // Acción para abrir archivo
        }
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: () => {
          // Acción para guardar archivo
        }
      },
      {
        label: 'Save As…',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: () => {
          // Acción para guardar como
        }
      },
      { type: 'separator' },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // Edit menu
  {
    label: 'Edit',
    submenu: [
      { role: 'undo', accelerator: 'CmdOrCtrl+Z' },
      { role: 'redo', accelerator: 'CmdOrCtrl+Shift+Z' },
      { type: 'separator' },
      { role: 'cut', accelerator: 'CmdOrCtrl+X' },
      { role: 'copy', accelerator: 'CmdOrCtrl+C' },
      { role: 'paste', accelerator: 'CmdOrCtrl+V' },
      { role: 'selectAll', accelerator: 'CmdOrCtrl+A' },
      { type: 'separator' },
      { role: 'find', accelerator: 'CmdOrCtrl+F' }
    ]
  }
];

const appMenu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(appMenu);

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
