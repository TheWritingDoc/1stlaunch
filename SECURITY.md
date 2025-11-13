# Security Policy

- Use HTTPS or SSH for remote operations.
- Do not commit secrets or credentials. Pre-commit hooks scan staged files.
- Commit messages must follow Conventional Commits.
- Pre-push validation will attempt project-specific tests when tools/configs exist.
- For PRs, ensure branch is up-to-date with `main` and resolve conflicts locally.