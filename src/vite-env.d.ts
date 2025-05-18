/// <reference types="vite/client" />

declare module '@tiptap/react' {
  export class Editor {
    commands: {
      setContent(content: string, emitUpdate?: boolean): boolean;
    };
    isActive(name: string, attributes?: Record<string, any>): boolean;
    isActive(attributes: Record<string, any>): boolean;
    getAttributes(attributeName: string): any;
    can(): {
      toggleBold(): boolean;
      toggleItalic(): boolean;
      toggleUnderline(): boolean;
      toggleCode(): boolean;
      toggleStrike(): boolean;
      undo(): boolean;
      redo(): boolean;
    };
    chain(): {
      focus(): {
        toggleBold(): { run(): void };
        toggleItalic(): { run(): void };
        toggleUnderline(): { run(): void };
        toggleCode(): { run(): void };
        toggleStrike(): { run(): void };
        toggleHeading(options: { level: number }): { run(): void };
        toggleBulletList(): { run(): void };
        toggleOrderedList(): { run(): void };
        setParagraph(): { run(): void };
        toggleBlockquote(): { run(): void };
        toggleHighlight(): { run(): void };
        undo(): { run(): void };
        redo(): { run(): void };
        setTextAlign(align: string): { run(): void };
        setLink(options: { href: string }): { run(): void };
        unsetLink(): { run(): void };
        extendMarkRange(type: string): {
          setLink(options: { href: string }): { run(): void };
          unsetLink(): { run(): void };
        };
        setImage(options: { src: string }): { run(): void };
      };
    };
  }
  
  export const useEditor: any;
  export const EditorContent: any;
}

declare module '@tiptap/starter-kit' {
  const StarterKit: any;
  export default StarterKit;
}

declare module '@tiptap/extension-document' {
  const Document: any;
  export default Document;
}

declare module '@tiptap/extension-paragraph' {
  const Paragraph: any;
  export default Paragraph;
}

declare module '@tiptap/extension-text' {
  const Text: any;
  export default Text;
}

declare module '@tiptap/extension-heading' {
  const Heading: any;
  export default Heading;
}

declare module '@tiptap/extension-link' {
  const Link: any;
  export default Link;
}

declare module '@tiptap/extension-image' {
  const Image: any;
  export default Image;
}

declare module '@tiptap/extension-highlight' {
  const Highlight: any;
  export default Highlight;
}

declare module '@tiptap/extension-text-style' {
  const TextStyle: any;
  export default TextStyle;
}

declare module '@tiptap/extension-color' {
  export const Color: any;
}

declare module '@tiptap/extension-text-align' {
  const TextAlign: any;
  export default TextAlign;
}

declare module '@tiptap/extension-placeholder' {
  const Placeholder: any;
  export default Placeholder;
}

declare module '@tiptap/extension-bubble-menu' {
  const BubbleMenu: any;
  export default BubbleMenu;
}
