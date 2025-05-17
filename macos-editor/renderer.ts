import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

document.addEventListener('DOMContentLoaded', () => {
  const editor = new Editor({
    element: document.querySelector('#editor') as HTMLElement,
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World!</p>',
  });

  document.querySelector('#bold')?.addEventListener('click', () => {
    editor.chain().focus().toggleBold().run();
  });

  document.querySelector('#italic')?.addEventListener('click', () => {
    editor.chain().focus().toggleItalic().run();
  });

  document.querySelector('#heading')?.addEventListener('click', () => {
    editor.chain().focus().toggleHeading({ level: 1 }).run();
  });
});
