// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Editor as TiptapEditor } from '@tiptap/react';
import MenuBar from './components/MenuBar';
import EditorComponent from './components/Editor';
// import StatusBar from './components/StatusBar'; // Assuming you might add this later
// import Toolbar from './components/Toolbar'; // Assuming you might add this later
import './styles/global.css'; // Global styles
import './styles/editor.css'; // Specific editor styles, like prose classes customization

const App: React.FC = () => {
  const [editor, setEditor] = useState<TiptapEditor | null>(null);
  // Will be used later for handling file operations
  const [_currentFile, _setCurrentFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  // Placeholder for file operations - these would interact with Electron's main process
  // For example, via window.electron.saveFile, window.electron.openFile

  useEffect(() => {
    // Example: Load a default file or last opened file on startup
    // This is a placeholder. In a real app, you'd load from storage or a file.
    const defaultContent = `
      <h1>Welcome to Pora Editor!</h1>
      <p>This is a basic Tiptap editor setup within an Electron and React application.</p>
      <p>You can start typing here. Use the menu bar above for formatting options.</p>
      <img src="https://source.unsplash.com/8xznAGy4HcY/800x400" />
      <p>Try highlighting text, making it <strong>bold</strong>, or <em>italic</em>.</p>
      <p>Create lists:</p>
      <ul><li>Item 1</li><li>Item 2</li></ul>
      <p>Or add a <a href="https://tiptap.dev">link</a>.</p>
      <p>Enjoy your writing experience!</p>
      `;
    setFileContent(defaultContent);

    // Listen for file content changes from main process (e.g., after opening a file)
    // window.electronAPI?.onFileOpened((_event, filePath, content) => {
    //   setCurrentFile(filePath);
    //   setFileContent(content);
    //   editor?.commands.setContent(content);
    // });

    // return () => {
    //   window.electronAPI?.removeAllListeners('file-opened');
    // };
  }, [editor]); // Added editor to dependency array if it might be used in future file ops

  const handleEditorReady = (tiptapEditor: TiptapEditor) => {
    setEditor(tiptapEditor);
    if (fileContent) {
      tiptapEditor.commands.setContent(fileContent, false);
    }
  };

  // const handleSave = () => {
  //   if (editor && currentFile) {
  //     const htmlContent = editor.getHTML();
  //     window.electronAPI?.saveFile(currentFile, htmlContent);
  //   }
  //   // else if (editor) { handleSaveAs() }
  // };

  return (
    <div className="app-container flex flex-col h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* <Toolbar /> */}
      <MenuBar editor={editor} />
      <div className="flex-grow flex flex-col overflow-hidden">
        <EditorComponent onEditorReady={handleEditorReady} initialContent={fileContent} />
      </div>
      {/* <StatusBar editor={editor} currentFile={currentFile} /> */}
    </div>
  );
};

export default App;
