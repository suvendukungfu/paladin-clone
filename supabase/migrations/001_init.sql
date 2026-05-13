-- PALADIN SUPABASE SCHEMA

-- 1. USERS
CREATE TABLE users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    rank_title VARCHAR(100) DEFAULT 'Novice Historian',
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ERAS (Categories for the Skill Tree)
CREATE TABLE eras (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon_name VARCHAR(100),
    order_index INTEGER NOT NULL,
    required_level INTEGER DEFAULT 1
);

-- 3. LESSONS (Nodes in the Skill Tree)
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    era_id UUID REFERENCES eras(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    xp_reward INTEGER DEFAULT 100,
    order_index INTEGER NOT NULL
);

-- 4. STORY SCENES (Cinematic Visual Novel Engine)
CREATE TABLE story_scenes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    character_name VARCHAR(100),
    dialogue_text TEXT NOT NULL,
    background_image_url TEXT,
    order_index INTEGER NOT NULL
);

-- 5. STORY CHOICES (Branching paths)
CREATE TABLE story_choices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scene_id UUID REFERENCES story_scenes(id) ON DELETE CASCADE,
    choice_text VARCHAR(255) NOT NULL,
    next_scene_id UUID REFERENCES story_scenes(id),
    xp_bonus INTEGER DEFAULT 0
);

-- 6. QUIZZES
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    time_limit_seconds INTEGER DEFAULT 30
);

CREATE TABLE quiz_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    option_text VARCHAR(255) NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE
);

-- 7. USER PROGRESS (Tracking completions)
CREATE TABLE user_lesson_progress (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    score INTEGER,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, lesson_id)
);

-- 8. ACHIEVEMENTS
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(100),
    rarity VARCHAR(50) DEFAULT 'Common',
    xp_reward INTEGER DEFAULT 50
);

CREATE TABLE user_achievements (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, achievement_id)
);

-- 9. DAILY CHALLENGES
CREATE TABLE daily_challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target_count INTEGER NOT NULL,
    xp_reward INTEGER NOT NULL
);

CREATE TABLE user_daily_challenges (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES daily_challenges(id) ON DELETE CASCADE,
    current_progress INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id, challenge_id)
);
