import { app, BrowserWindow, Menu, dialog, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { menuTemplate } from '../src/utils/menuTemplate';

// Mantener una referencia global del objeto window para evitar que se cierre automáticamente
let mainWindow: BrowserWindow | null = null;
let currentFilePath: string | null = null;

function createWindow() {
  // Crear la ventana del navegador
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'hiddenInset', // Estilo nativo de macOS
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Cargar la app React (en desarrollo o producción)
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Configurar el menú nativo
  const menu = Menu.buildFromTemplate(menuTemplate(app, mainWindow));
  Menu.setApplicationMenu(menu);

  // Gestión de eventos de archivos
  ipcMain.handle('file:new', () => {
    currentFilePath = null;
    mainWindow?.webContents.send('editor:clear');
  });

  ipcMain.handle('file:open', async () => {
    if (!mainWindow) return;
    
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      filters: [{ name: 'Documentos', extensions: ['txt', 'md', 'html', 'json'] }],
      properties: ['openFile'],
    });

    if (!canceled && filePaths.length > 0) {
      currentFilePath = filePaths[0];
      const content = fs.readFileSync(currentFilePath, 'utf-8');
      return { path: currentFilePath, content };
    }
    
    return null;
  });

  ipcMain.handle('file:save', async (_, content: string) => {
    if (!mainWindow) return false;
    
    if (!currentFilePath) {
      const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
        filters: [{ name: 'Documentos', extensions: ['txt', 'md', 'html', 'json'] }],
      });
      
      if (canceled || !filePath) return false;
      currentFilePath = filePath;
    }
    
    fs.writeFileSync(currentFilePath, content, 'utf-8');
    return true;
  });

  ipcMain.handle('file:saveAs', async (_, content: string) => {
    if (!mainWindow) return false;
    
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      filters: [{ name: 'Documentos', extensions: ['txt', 'md', 'html', 'json'] }],
    });
    
    if (canceled || !filePath) return false;
    
    currentFilePath = filePath;
    fs.writeFileSync(currentFilePath, content, 'utf-8');
    return true;
  });
}

// Iniciar la aplicación cuando Electron esté listo
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // En macOS es común volver a crear una ventana cuando
    // se hace clic en el icono del dock y no hay otras ventanas abiertas
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Cerrar la aplicación cuando todas las ventanas estén cerradas (excepto en macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});