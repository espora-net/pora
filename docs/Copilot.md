# Copilot.md

## Development Conditions

- All documentation and user-facing text should be available in both English and Spanish.
- Every new or updated documentation file must have an English and a Spanish version, named with `.en.md` and `.es.md` suffixes respectively (e.g., `installation.en.md`, `installation.es.md`).
- Code comments and commit messages should be clear and, when possible, bilingual.
- UI elements and error messages in the application must support both languages.
- Any workflow, script, or automation should be documented in both languages.
- Pull requests will only be accepted if both language versions are updated.
- **Any relevant design decisions, UI control types, libraries to use, and language requirements must be documented and kept up to date in the file `docs/Copilot.md`.**
- The editor now includes an `LLMButton` component that integrates with OpenAI, Azure and LMStudio via `src/lib/llm-service.ts`.

---

> This file must be referenced in the main README and followed for all future development.
