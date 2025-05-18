export interface FileAPI {
  fileNew: () => Promise<void>;
  fileOpen: () => Promise<{ path: string; content: string } | null>;
  fileSave: (content: string) => Promise<boolean>;
  fileSaveAs: (content: string) => Promise<boolean>;
  onEditorClear: (callback: () => void) => () => void;
}

declare global {
  interface Window {
    electronAPI: FileAPI;
  }
}

export const fileOperations = {
  newFile: async (): Promise<void> => {
    await window.electronAPI.fileNew();
  },
  
  openFile: async (): Promise<{ path: string; content: string } | null> => {
    return await window.electronAPI.fileOpen();
  },
  
  saveFile: async (content: string): Promise<boolean> => {
    return await window.electronAPI.fileSave(content);
  },
  
  saveFileAs: async (content: string): Promise<boolean> => {
    return await window.electronAPI.fileSaveAs(content);
  },
};