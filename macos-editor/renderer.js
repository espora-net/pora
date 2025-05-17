const { Editor } = require('@tiptap/core')
const StarterKit = require('@tiptap/starter-kit')

const editor = new Editor({
  element: document.querySelector('#editor'),
  extensions: [
    StarterKit,
  ],
  content: '<p>Hello World!</p>',
})
