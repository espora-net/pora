import { app, BrowserWindow, Menu, dialog, shell, ipcMain } from 'electron';
import path from 'path';
import net from 'net';

const isDev = process.env.NODE_ENV === 'development';
const isMac = process.platform === 'darwin';

// Keep a global reference of the window object to avoid garbage collection
let mainWindow;
let splashWindow;

// Set app name for macOS menu
app.name = 'Pora';

// Function to find an available port
function findAvailablePort(startPort, callback) {
  const server = net.createServer();
  server.listen(startPort, () => {
    server.once('close', () => {
      callback(startPort);
    });
    server.close();
  });
  server.on('error', () => {
    findAvailablePort(startPort + 1, callback);
  });
}

// Create a splash window
function createSplashWindow(port) {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    transparent: true,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    alwaysOnTop: true,
    show: false // Don't show window until it's ready
  });

  // Load a custom splash screen HTML in production
  // Or just use the main app in development (since it has the splash screen component)
  if (isDev) {
    splashWindow.loadURL(`http://localhost:${port}`);
  } else {
    splashWindow.loadFile(path.join(__dirname, '../dist/splash.html'));
  }

  splashWindow.once('ready-to-show', () => {
    splashWindow.show();
  });

  splashWindow.on('closed', () => {
    splashWindow = null;
  });
}

function createWindow(port) {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'hiddenInset', // macOS-style title bar
    backgroundColor: '#ffffff',
    show: false, // Don't show window until splash is done
    vibrancy: 'under-window', // macOS vibrancy effect
    visualEffectState: 'active',
    trafficLightPosition: { x: 14, y: 14 }
  });

  // Load the app
  if (isDev) {
    // In development, load from Vite dev server
    mainWindow.loadURL(`http://localhost:${port}`);
    // Open DevTools
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built app
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Show window when ready to avoid flickering
  mainWindow.once('ready-to-show', () => {
    if (splashWindow) {
      // Add a delay to show the splash screen for at least a minimal time
      setTimeout(() => {
        splashWindow.destroy();
        mainWindow.show();
      }, 1500);
    } else {
      mainWindow.show();
    }
  });

  // Set up the application menu (macOS style)
  const menuTemplate = [
    // App menu (macOS only)
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        {
          label: 'Preferences...',
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            // Show preferences window when implemented
            mainWindow.webContents.send('show-preferences');
          }
        },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    // File menu
    {
      label: 'File',
      submenu: [
        {
          label: 'New Document',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('new-document');
          }
        },
        {
          label: 'Open...',
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
              filters: [
                { name: 'Text Documents', extensions: ['txt', 'md', 'html'] },
                { name: 'All Files', extensions: ['*'] }
              ],
              properties: ['openFile']
            });
            if (!canceled && filePaths.length > 0) {
              mainWindow.webContents.send('open-document', filePaths[0]);
            }
          }
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            mainWindow.webContents.send('save-document');
          }
        },
        {
          label: 'Save As...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: async () => {
            const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
              filters: [
                { name: 'Text Documents', extensions: ['txt', 'md', 'html'] },
                { name: 'All Files', extensions: ['*'] }
              ]
            });
            if (!canceled && filePath) {
              mainWindow.webContents.send('save-document-as', filePath);
            }
          }
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'close' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            await shell.openExternal('https://pora.app');
          }
        },
        {
          label: 'Documentation',
          click: async () => {
            await shell.openExternal('https://docs.pora.app');
          }
        },
        { type: 'separator' },
        {
          label: 'About Pora',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              title: 'About Pora',
              message: 'Pora - Rich Text Editor',
              detail: `Version: ${app.getVersion()}\nElectron: ${process.versions.electron}\nChrome: ${process.versions.chrome}\nNode.js: ${process.versions.node}\nV8: ${process.versions.v8}`,
              buttons: ['OK'],
              icon: path.join(__dirname, '../build/icons/icon.icns')
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // Handle window close event
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// Create window when Electron is ready
app.whenReady().then(() => {
  // Show splash screen first
  findAvailablePort(5173, (port) => {
    createSplashWindow(port);
    
    // Create main window after a short delay
    setTimeout(() => {
      createWindow(port);
    }, 500);
  });

  // On macOS, it's common to re-create a window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      findAvailablePort(5173, (port) => {
        createWindow(port);
      });
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Document event handlers
ipcMain.on('check-for-changes', async (event) => {
  const choice = await dialog.showMessageBox(mainWindow, {
    type: 'question',
    buttons: ['Save', "Don't Save", 'Cancel'],
    defaultId: 0,
    title: 'Unsaved Changes',
    message: 'There are unsaved changes. Do you want to save them?'
  });
  
  event.reply('check-for-changes-response', choice.response);
});
