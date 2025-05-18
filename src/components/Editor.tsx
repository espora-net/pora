// src/components/Editor.tsx
import React from 'react';
import { useEditor, EditorContent, Editor as TiptapEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import BubbleMenu from '@tiptap/extension-bubble-menu';

interface EditorProps {
  onEditorReady: (editor: TiptapEditor) => void;
  initialContent?: string;
}

const EditorComponent: React.FC<EditorProps> = ({ onEditorReady, initialContent = '' }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable history to use our own undo/redo buttons if preferred
        // history: false,
      }),
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
      }),
      Image.configure({
        inline: false, // Allows images to be on their own line
        allowBase64: true, // For pasting images directly
      }),
      Highlight.configure({ multicolor: true }),
      TextStyle, // Required for Color extension
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Start typing here...',
      }),
      BubbleMenu.configure({
        // You can customize the bubble menu here if needed
        // element: document.querySelector('.bubble-menu'), // Example
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none editor-content',
      },
    },
    onUpdate: ({ editor }) => {
      // console.log(editor.getHTML());
      // You can add logic here to save content, etc.
    },
    onCreate: ({ editor }) => {
      onEditorReady(editor);
    },
  });

  return (
    <div className="editor-wrapper flex-grow flex flex-col overflow-hidden">
      {/* Optional: Bubble Menu placeholder if you want to customize its container */}
      {/* <div className="bubble-menu"></div> */}
      <EditorContent editor={editor} className="flex-grow overflow-y-auto p-4" />
    </div>
  );
};

export default EditorComponent;
