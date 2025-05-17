# pora
My Personal editor

## macOS Editor based on Tiptap

This project includes a macOS editor based on the Tiptap library. The editor can be installed as a DMG file.

### Installation Instructions

1. Download the DMG file from the releases page.
2. Open the DMG file and drag the editor to your Applications folder.
3. Launch the editor from your Applications folder.

### Dependencies

The macOS editor is built using the following dependencies:
- [Tiptap](https://github.com/ueberdosis/tiptap)
- [Electron](https://www.electronjs.org/)

### Developer Mode Installation

To set up the development environment for the macOS editor, follow these steps:

1. Install Node.js and npm:
   - Download and install Node.js from the official website: https://nodejs.org/
   - Verify the installation by running the following commands in your terminal:
     ```
     node -v
     npm -v
     ```

2. Clone the repository and install dependencies:
   - Clone the repository using the following command:
     ```
     git clone https://github.com/espora-net/pora.git
     ```
   - Navigate to the `macos-editor` directory:
     ```
     cd pora/macos-editor
     ```
   - Install the dependencies:
     ```
     npm install
     ```

3. Run the application in development mode:
   - Use the following command to start the application in development mode:
     ```
     npm start
     ```
