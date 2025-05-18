import React, { useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';

interface StatusBarProps {
  editor: Editor | null;
  filePath: string | null;
}

const StatusBar: React.FC<StatusBarProps> = ({ editor, filePath }) => {
  const [wordCount, setWordCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    if (!editor) return;

    const updateStats = () => {
      const text = editor.getText();
      setCharCount(text.length);
      setWordCount(text.split(/\s+/).filter(word => word.length > 0).length);
    };

    // Actualizar estadísticas cuando cambia el contenido
    editor.on('update', updateStats);
    
    // Inicializar
    updateStats();

    return () => {
      editor.off('update', updateStats);
    };
  }, [editor]);

  return (
    <div className="status-bar">
      <div>
        {filePath ? (
          <span>Archivo: {filePath.split('/').pop()}</span>
        ) : (
          <span>Documento sin guardar</span>
        )}
      </div>
      <div>
        <span>{wordCount} palabras</span>
        <span className="mx-2">|</span>
        <span>{charCount} caracteres</span>
      </div>
    </div>
  );
};

export default StatusBar;