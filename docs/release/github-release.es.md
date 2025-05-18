# Workflow de Release con GitHub Actions

Este proyecto utiliza un workflow de GitHub Actions para automatizar la construcción y publicación de releases con el instalador DMG.

## ¿Cómo funciona?

- **Build automático:** Cada push o pull request a la rama `main` ejecuta el job `build`, que construye el DMG y lo sube como artefacto.
- **Release manual:** Solo cuando publicas una release en GitHub (desde la interfaz web o usando la API), se ejecuta el job `release` que:
  1. Construye el DMG.
  2. Adjunta el DMG generado a la release publicada.

## ¿Cómo crear una release?

1. Haz commit y push de tus cambios a la rama `main`.
2. Ve a la página de [Releases de GitHub](https://github.com/espora-net/pora/releases).
3. Haz clic en "Draft a new release" (Borrador de nueva release).
4. Elige un tag (o crea uno nuevo), ponle un título y descripción.
5. Haz clic en "Publish release" (Publicar release).
6. El workflow de GitHub Actions construirá el DMG y lo adjuntará automáticamente a la release.

## Referencias
- [build.yml](../../.github/workflows/build.yml)
- [softprops/action-gh-release](https://github.com/softprops/action-gh-release)

---

Para más detalles, revisa el archivo de workflow y la documentación general del proyecto.
