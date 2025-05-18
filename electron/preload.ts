import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  fileNew: () => ipcRenderer.invoke('file:new'),
  fileOpen: () => ipcRenderer.invoke('file:open'),
  fileSave: (content: string) => ipcRenderer.invoke('file:save', content),
  fileSaveAs: (content: string) => ipcRenderer.invoke('file:saveAs', content),
  onEditorClear: (callback: () => void) => {
    ipcRenderer.on('editor:clear', callback);
    return () => ipcRenderer.removeListener('editor:clear', callback);
  },
});