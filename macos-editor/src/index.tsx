import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Image from '@tiptap/extension-image';
import Typography from '@tiptap/extension-typography';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import './styles.scss';

const MacOSEditor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
      Link,
      TaskList,
      TaskItem,
      Image,
      Typography,
      Subscript,
      Superscript,
    ],
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
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()}>Strike</button>
        <button onClick={() => editor.chain().focus().toggleHighlight().run()}>Highlight</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>Left</button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>Center</button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>Right</button>
        <button onClick={() => editor.chain().focus().setTextAlign('justify').run()}>Justify</button>
        <button onClick={() => editor.chain().focus().toggleTaskList().run()}>Task List</button>
        <button onClick={() => editor.chain().focus().toggleSuperscript().run()}>Superscript</button>
        <button onClick={() => editor.chain().focus().toggleSubscript().run()}>Subscript</button>
        <button onClick={() => editor.chain().focus().setLink({ href: prompt('URL:') || '' }).run()}>Link</button>
        <button onClick={() => editor.chain().focus().unsetLink().run()}>Unlink</button>
        <button onClick={() => editor.chain().focus().setImage({ src: prompt('Image URL:') || '' }).run()}>Image</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default MacOSEditor;
