# Contributing to Paladin ⚔️

First off, thank you for considering contributing to Paladin! It's people like you that make Paladin such a great tool for learning history.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs
* **Check the FAQ** to see if your issue is already addressed.
* **Search existing issues** to see if the bug has already been reported.
* If you find a new bug, please **open a new issue** using the Bug Report template.

### Suggesting Enhancements
* Open a new issue using the Feature Request template.
* Provide a clear and concise description of the proposed enhancement.

### Pull Requests
1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Development Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/suvendukungfu/paladin-clone.git
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Environment Variables**
   Copy `.env.example` to `.env.local` and fill in your Supabase credentials.
4. **Run the development server**
   ```bash
   npm run dev
   ```

## Style Guide

### Git Commit Messages (Conventional Commits)
We use [Conventional Commits](https://www.conventionalcommits.org/). This helps us auto-generate changelogs and maintain a clean history.

Format: `<type>(<scope>): <subject>`

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that do not affect the meaning of the code (white-space, formatting)
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `perf:` A code change that improves performance

*Example*: `feat(lessons): add combo multiplier to quiz engine`

### TypeScript Style Guide
* Use functional components and hooks.
* Prefer interface over type for object definitions.
* Always define types for props and state.
* Use descriptive variable names.

### CSS & Tailwind
* Use Tailwind utility classes for layout and spacing.
* Use `src/app/globals.css` for custom animations and complex glassmorphism effects.
* Follow the established color palette (Gold, Crimson, Charcoal).

## Recognition
Contributors will be featured in our [Hall of Champions](LEADERBOARD.md) (README contributors section).

Thank you for being part of the journey!
