# Integración LLM

El editor incluye un botón opcional que envía el documento actual a un modelo de lenguaje.
El servicio permite OpenAI, Azure OpenAI o un servidor local LMStudio.
La configuración se maneja mediante las siguientes variables de entorno:

- `VITE_LLM_PROVIDER`: `openai`, `azure` o `local`.
- `VITE_LLM_API_KEY`: clave de API cuando sea necesaria.
- `VITE_LLM_ENDPOINT`: URL del servicio.
- `VITE_LLM_MODEL`: nombre del modelo.

Al pulsar el botón el texto generado se inserta en la posición del cursor.
