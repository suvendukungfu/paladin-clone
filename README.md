# ⚔️ Paladin — Master History Through Adventure

<p align="center">
  <img src="https://raw.githubusercontent.com/suvendukungfu/paladin-clone/main/public/logo-placeholder.png" alt="Paladin Logo" width="200" />
</p>

<p align="center">
  <b>A production-grade gamified history learning platform.</b><br />
  <i>Duolingo meets dark-fantasy RPG visual novel.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" />
  <img src="https://img.shields.io/github/issues/suvendukungfu/paladin-clone?style=flat-square" alt="GitHub issues" />
  <img src="https://img.shields.io/github/license/suvendukungfu/paladin-clone?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs" alt="Next.js" />
</p>

---

## 📖 Table of Contents
- [Why Paladin?](#-why-paladin)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🤔 Why Paladin?

Traditional history education often feels static—relying on textbooks and passive video content. **Paladin** was engineered to solve this by treating history as an interactive medium. By borrowing mechanics from AAA role-playing games and visual novels, we transform passive reading into active decision-making. 

Our core philosophy: *Learning should feel like leveling up.*

---

## ✨ Key Features

| Feature | Description | Architecture Highlights |
|---|---|---|
| 🎭 **Story Engine** | Fully data-driven visual-novel engine. | React Hooks for typewriter text, Framer Motion for Ken Burns pan/zoom. |
| 🧠 **Quiz Engine** | Timed assessments with combo multipliers. | Zustand state persistence, dynamic XP calculation algorithms. |
| 🗺️ **Skill Tree** | Interactive, pannable 2D map. | Custom SVG path generation, hardware-accelerated drag gestures. |
| 🏆 **Achievements** | Collectible badges with rarity tiers. | Event-driven unlock listeners, CSS glassmorphism UI. |
| 🥇 **Leaderboard** | Real-time global rankings. | Supabase real-time sync (planned), animated podium layouts. |
| 🔥 **Retention** | Multi-day streak systems. | LocalStorage hydration guarding, daily challenge flags. |

---

## 🛠️ Tech Stack

Paladin is built on a modern, highly optimized Next.js 15 architecture:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with persistent middleware)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Backend/Auth**: [Supabase](https://supabase.com/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📁 Project Structure

```text
paladin-clone/
├── src/
│   ├── app/                # Next.js App Router pages & layouts
│   ├── components/         # Reusable React components
│   │   ├── dashboard/      # Navigation, stats, and daily chest
│   │   ├── lessons/        # Story Engine and visual novel UI
│   │   └── ui/             # Generic atomic UI (buttons, overlays, confetti)
│   ├── data/               # Seed data, mock databases, and static assets
│   ├── hooks/              # Custom React hooks (useXP, useHydration)
│   ├── store/              # Zustand global state definitions
│   └── lib/                # Utility functions and Supabase clients
├── public/                 # Static assets, fonts, and images
└── tailwind.config.ts      # Custom theme, brand colors (Paladin Gold)
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18.17.0 or newer
- npm, yarn, or pnpm
- A [Supabase](https://supabase.com/) project (for authentication and live data)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/suvendukungfu/paladin-clone.git
   cd paladin-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Launch the Development Server**
   ```bash
   npm run dev
   ```
   *The application will be available at [http://localhost:3000](http://localhost:3000).*

---

## 🗺️ Roadmap

We are actively developing Paladin towards a 1.0 release. Check our [GitHub Projects]() board for active sprints.

- [ ] **Phase 1**: Supabase Database Migration (Moving off local seed data)
- [ ] **Phase 2**: Real-time Multiplayer Trivia Duels
- [ ] **Phase 3**: Dynamic "Lore AI" powered by LLMs for custom historical queries
- [ ] **Phase 4**: Progressive Web App (PWA) offline support
- [ ] **Phase 5**: Native Mobile Build (Capacitor/React Native)

---

## 🤝 Contributing

We believe in the power of open-source and welcome contributions from developers of all skill levels! 

To maintain high code quality, please adhere to our contribution standards:
1. **Fork** the repository and create your feature branch: `git checkout -b feature/my-new-feature`
2. **Commit** your changes using Conventional Commits: `git commit -m 'feat: add new roman empire lesson'`
3. **Push** to the branch: `git push origin feature/my-new-feature`
4. Submit a **Pull Request** targeting the `main` branch.

👉 **For detailed instructions, please read our [CONTRIBUTING.md](CONTRIBUTING.md) and [ARCHITECTURE.md](ARCHITECTURE.md).**

---

## 🏆 Hall of Champions

A massive thank you to our legendary contributors:

<a href="https://github.com/suvendukungfu/paladin-clone/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=suvendukungfu/paladin-clone" alt="Contributors" />
</a>

---

## 🛡️ 8x Engineer Challenge

Paladin was specifically architected and polished for the **8x Engineer Challenge**. 
For a comprehensive breakdown of our engineering philosophy, AI-assisted development workflow, and rendering optimizations, please review our reflection document:

👉 **[Read the 8x Engineer Reflection](REFLECTION.md)**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<p align="center">
  <br />
  <i>Built with ❤️ by the Paladin Community</i>
</p>
