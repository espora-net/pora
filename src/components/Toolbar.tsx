import React from 'react';
import { Editor } from '@// 16. src/App.tsx
// Componente principal de la aplicación
import React, { useState } from 'react';
import Editor from './components/Editor';
import MenuBar from './components/MenuBar';
import './styles/global.css';

const App: React.FC = () => {
  const [filePath, setFilePath] = useState<string | null>(null);

  return (
    <div className="app-container">
      <MenuBar editor={null} setFilePath={setFilePath} />
      <div className="content-area">
        <Editor filePath={filePath} />
      </div>
    </div>
  );
};

export default App;