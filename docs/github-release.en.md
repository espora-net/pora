# GitHub Actions Release Workflow

This project uses a GitHub Actions workflow to automate building and publishing releases with the DMG installer.

## How does it work?

- **Automatic build:** Every push or pull request to the `main` branch runs the `build` job, which builds the DMG and uploads it as an artifact.
- **Manual release:** Only when you publish a release on GitHub (via the web interface or API), the `release` job runs:
  1. Builds the DMG.
  2. Attaches the generated DMG to the published release.

## How to create a release?

1. Commit and push your changes to the `main` branch.
2. Go to the [GitHub Releases page](https://github.com/espora-net/pora/releases).
3. Click "Draft a new release".
4. Choose a tag (or create a new one), add a title and description.
5. Click "Publish release".
6. The GitHub Actions workflow will build the DMG and attach it to the release automatically.

## References
- [build.yml](../.github/workflows/build.yml)
- [softprops/action-gh-release](https://github.com/softprops/action-gh-release)

---

For more details, check the workflow file and the general project documentation.
