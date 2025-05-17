# GitHub Actions Workflow for Building macOS Editor DMG

The project includes a GitHub Actions workflow for building the macOS editor DMG. The workflow is defined in the `.github/workflows/build.yml` file. It is triggered on pushes and pull requests to the `main` branch. The workflow performs the following steps:

1. Checks out the code.
2. Sets up Node.js.
3. Installs dependencies.
4. Builds the DMG.
5. Uploads the DMG as an artifact.
