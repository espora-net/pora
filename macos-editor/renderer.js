const { Editor } = require('@tiptap/core')
const StarterKit = require('@tiptap/starter-kit')

// Esperar a que el DOM se cargue
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar el editor
  const editor = new Editor({
    element: document.querySelector('#editor'),
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World!</p>',
  })

  // Configurar la barra de herramientas
  document.querySelector('#bold').addEventListener('click', () => {
    editor.chain().focus().toggleBold().run()
  })

  document.querySelector('#italic').addEventListener('click', () => {
    editor.chain().focus().toggleItalic().run()
  })

  document.querySelector('#heading').addEventListener('click', () => {
    editor.chain().focus().toggleHeading({ level: 1 }).run()
  })
})
