# LLM Integration

The editor includes an optional button that sends the current document to a Large Language Model.
The service accepts OpenAI, Azure OpenAI or a local LMStudio server.
Configuration is handled via the following environment variables:

- `VITE_LLM_PROVIDER`: `openai`, `azure` or `local`.
- `VITE_LLM_API_KEY`: API key when required.
- `VITE_LLM_ENDPOINT`: custom endpoint URL.
- `VITE_LLM_MODEL`: model name.

When the button is pressed the returned text is inserted at the cursor position.
