# Paladin Architecture 🏛️

This document outlines the technical architecture of Paladin, explaining how the different systems interact to create a seamless, gamified history learning experience.

## System Overview

Paladin is built on **Next.js 15** using the **App Router**. It follows a feature-based directory structure to maintain scalability as the content grows.

### 1. State Management (Zustand)
We use **Zustand** for global client-side state.
- **`userStore.ts`**: Manages XP, levels, streaks, and unlocked content.
- **Persistence**: The store is persisted to `localStorage` using Zustand's `persist` middleware, ensuring user progress isn't lost on refresh.

### 2. Story Engine 🎭
The core learning experience is powered by a custom visual-novel engine.
- **Data-Driven**: All scenes, dialogue, and choices are defined in `src/data/seed.ts`.
- **Typing**: Scenes can be `dialogue`, `narration`, or `lore_card`.
- **Branching**: The engine supports branching logic via `nextSceneId` on choices.
- **Animations**: **Framer Motion** handles scene crossfades and the typewriter effect.

### 3. Quiz Engine 🧠
A timed assessment system that reinforces learning.
- **Combo System**: Consecutive correct answers multiply XP rewards.
- **Feedback**: Instant feedback on correctness with explanations for every answer.
- **Grading**: A dynamic grading algorithm (S, A, B, C) based on accuracy and speed.

### 4. Skill Tree 🗺️
An interactive SVG-based progression map.
- **Graph Structure**: Nodes are connected via parent-child relationships.
- **SVG Rendering**: Connection lines are rendered using SVG paths, calculated based on node positions.
- **Draggable Map**: The entire map is pannable and zoomable (future enhancement).

### 5. Data Flow
1. **User Action**: Completes a lesson.
2. **Action Dispatch**: `completeLesson(id)` is called in the store.
3. **State Update**: XP is added, level is recalculated, and the lesson is marked as complete.
4. **UI Reactivity**: The `LearningMap` and `StatBar` automatically update to reflect the new state.

## Technical Choices

- **Tailwind CSS**: For rapid, responsive UI development.
- **Lucide React**: Consistent iconography.
- **Supabase**: Chosen for its robust Auth and Realtime capabilities (transitioning from local mock data).
- **TypeScript**: Mandatory for all components to ensure type safety across the complex story data structures.

## Future Roadmap
- **Supabase Sync**: Moving all state to the database.
- **Multiplayer Duel**: Real-time history trivia battles.
- **Dynamic Content API**: Allow community-submitted historical scenarios.
