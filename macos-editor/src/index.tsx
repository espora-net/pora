import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './styles.scss';

const MacOSEditor: React.FC = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>Heading</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default MacOSEditor;
