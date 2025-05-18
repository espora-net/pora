const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Cargar la información del package.json
const packageJson = require('./package.json');
const appName = packageJson.productName;

// Establecer el nombre de la aplicación lo más temprano posible
app.name = appName;
if (app.setName) {
  app.setName(appName);
}

// Función para crear una nueva ventana de edición
function createNewFileWindow() {
  const newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: `New File - ${packageJson.productName}`,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  newWindow.loadFile('index.html');
  return newWindow;
}

// Menú personalizado con atajos y orden estándar
const isMac = process.platform === 'darwin';

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
          createNewFileWindow();
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

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    title: appName,
    name: appName,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  await mainWindow.loadFile('index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
}

app.on('ready', () => {
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
