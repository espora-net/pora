// src/components/MenuBar.tsx
import React from 'react';
import { Editor } from '@tiptap/react';
import { 
  Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3, 
  Pilcrow, List, ListOrdered, Quote, Undo, Redo, Link as LinkIcon, 
  Image as ImageIcon, Highlight, AlignLeft, AlignCenter, AlignRight, AlignJustify
  // Palette icon can be used if a color picker is implemented
} from 'lucide-react';

interface MenuBarProps {
  editor: Editor | null;
}

const MenuButton: React.FC<{ 
  onClick: () => void; 
  title: string; 
  isActive?: boolean; 
  isDisabled?: boolean; 
  children: React.ReactNode 
}> = ({ onClick, title, isActive = false, isDisabled = false, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={isDisabled}
      className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${isActive ? 'bg-gray-300 dark:bg-gray-600' : 'bg-transparent'}`}
    >
      {children}
    </button>
  );
};


const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    // Simple prompt for URL. In a real app, you might use a modal.
    const url = window.prompt('URL', previousUrl);

    if (url === null) return; // User cancelled
    if (url === '') { // User wants to remove link
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };
  
  // Basic color functionality (can be expanded with a color picker)
  // const setColor = (color: string) => {
  //   editor.chain().focus().setColor(color).run();
  // };

  return (
    <div className="menu-bar p-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex flex-wrap items-center gap-x-1 gap-y-1">
      <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} title="Bold" isActive={editor.isActive('bold')} isDisabled={!editor.can().toggleBold()}> <Bold size={18} /> </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic" isActive={editor.isActive('italic')} isDisabled={!editor.can().toggleItalic()}> <Italic size={18} /> </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough" isActive={editor.isActive('strike')} isDisabled={!editor.can().toggleStrike()}> <Strikethrough size={18} /> </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleCode().run()} title="Code" isActive={editor.isActive('code')} isDisabled={!editor.can().toggleCode()}> <Code size={18} /> </MenuButton>
      
      <div className="h-5 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Heading 1" isActive={editor.isActive('heading', { level: 1 })}> <Heading1 size={18} /> </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2" isActive={editor.isActive('heading', { level: 2 })}> <Heading2 size={18} /> </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3" isActive={editor.isActive('heading', { level: 3 })}> <Heading3 size={18} /> </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().setParagraph().run()} title="Paragraph" isActive={editor.isActive('paragraph')}> <Pilcrow size={18} /> </MenuButton>
      
      <div className="h-5 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List" isActive={editor.isActive('bulletList')}> <List size={18} /> </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered List" isActive={editor.isActive('orderedList')}> <ListOrdered size={18} /> </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote" isActive={editor.isActive('blockquote')}> <Quote size={18} /> </MenuButton>

      <div className="h-5 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
      
      <MenuButton onClick={setLink} title="Set Link" isActive={editor.isActive('link')}> <LinkIcon size={18} /> </MenuButton>
      <MenuButton onClick={addImage} title="Add Image"> <ImageIcon size={18} /> </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleHighlight().run()} title="Highlight" isActive={editor.isActive('highlight')}> <Highlight size={18} /> </MenuButton>
      
      {/* Example for color - this would ideally use a color picker
      <MenuButton onClick={() => setColor('#ff0000')} title="Set Red Color" isActive={editor.isActive('textStyle', { color: '#ff0000' })}> <Palette size={18} /> </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().unsetColor().run()} title="Unset Color"> UnsetColor </MenuButton>
      */}

      <div className="h-5 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <MenuButton onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Align Left" isActive={editor.isActive({ textAlign: 'left' })}> <AlignLeft size={18} /> </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Align Center" isActive={editor.isActive({ textAlign: 'center' })}> <AlignCenter size={18} /> </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Align Right" isActive={editor.isActive({ textAlign: 'right' })}> <AlignRight size={18} /> </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} title="Align Justify" isActive={editor.isActive({ textAlign: 'justify' })}> <AlignJustify size={18} /> </MenuButton>

      <div className="h-5 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <MenuButton onClick={() => editor.chain().focus().undo().run()} title="Undo" isDisabled={!editor.can().undo()}> <Undo size={18} /> </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().redo().run()} title="Redo" isDisabled={!editor.can().redo()}> <Redo size={18} /> </MenuButton>
    </div>
  );
};

export default MenuBar;
