// filepath: /workspaces/pora/src/components/Toolbar.tsx
import React from 'react';
import { Editor as TiptapEditor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react';

interface ToolbarProps {
  editor: TiptapEditor | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="toolbar flex flex-wrap gap-2 p-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      {/* Text formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={'toolbar-btn ' + (editor.isActive('bold') ? 'active' : '')}
        title="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={'toolbar-btn ' + (editor.isActive('italic') ? 'active' : '')}
        title="Italic"
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={'toolbar-btn ' + (editor.isActive('underline') ? 'active' : '')}
        title="Underline"
      >
        <Underline size={18} />
      </button>

      <div className="toolbar-divider"></div>

      {/* Headings */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={'toolbar-btn ' + (editor.isActive('heading', { level: 1 }) ? 'active' : '')}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={'toolbar-btn ' + (editor.isActive('heading', { level: 2 }) ? 'active' : '')}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={'toolbar-btn ' + (editor.isActive('heading', { level: 3 }) ? 'active' : '')}
        title="Heading 3"
      >
        <Heading3 size={18} />
      </button>

      <div className="toolbar-divider"></div>

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={'toolbar-btn ' + (editor.isActive('bulletList') ? 'active' : '')}
        title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={'toolbar-btn ' + (editor.isActive('orderedList') ? 'active' : '')}
        title="Ordered List"
      >
        <ListOrdered size={18} />
      </button>

      <div className="toolbar-divider"></div>

      {/* Alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={'toolbar-btn ' + (editor.isActive({ textAlign: 'left' }) ? 'active' : '')}
        title="Align Left"
      >
        <AlignLeft size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={'toolbar-btn ' + (editor.isActive({ textAlign: 'center' }) ? 'active' : '')}
        title="Align Center"
      >
        <AlignCenter size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={'toolbar-btn ' + (editor.isActive({ textAlign: 'right' }) ? 'active' : '')}
        title="Align Right"
      >
        <AlignRight size={18} />
      </button>

      <div className="toolbar-divider"></div>

      {/* Insert */}
      <button
        onClick={() => {
          const url = window.prompt('Enter the URL:');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={'toolbar-btn ' + (editor.isActive('link') ? 'active' : '')}
        title="Insert Link"
      >
        <Link size={18} />
      </button>
      <button
        onClick={() => {
          const url = window.prompt('Enter the image URL:');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="toolbar-btn"
        title="Insert Image"
      >
        <Image size={18} />
      </button>
    </div>
  );
};

export default Toolbar;
