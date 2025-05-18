// electron/preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Expose any needed APIs to the renderer process
contextBridge.exposeInMainWorld('electron', {
  // Document operations
  documentOperations: {
    // Signal to save the document
    saveDocument: (callback) => {
      ipcRenderer.on('save-document', callback);
    },
    // Signal to save the document with a specific path
    saveDocumentAs: (callback) => {
      ipcRenderer.on('save-document-as', callback);
    },
    // Signal to open a document
    openDocument: (callback) => {
      ipcRenderer.on('open-document', callback);
    },
    // Signal to create a new document
    newDocument: (callback) => {
      ipcRenderer.on('new-document', callback);
    },
    // Check if there are unsaved changes
    checkForChanges: () => {
      return new Promise((resolve) => {
        ipcRenderer.once('check-for-changes-response', (_, response) => {
          resolve(response);
        });
        ipcRenderer.send('check-for-changes');
      });
    }
  },
  
  // App operations
  appOperations: {
    // Signal to show preferences
    showPreferences: (callback) => {
      ipcRenderer.on('show-preferences', callback);
    },
    // Get app version
    getVersion: () => process.versions.electron
  },
  
  // Remove listeners when they're no longer needed
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  // Any initialization that needs to happen after DOM is loaded
  console.log('DOM fully loaded and parsed - Pora is running with Electron ' + process.versions.electron);
});
