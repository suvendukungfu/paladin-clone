// ═══════════════════════════════════════════
// PALADIN — Complete Seed Data
// ═══════════════════════════════════════════

export interface Scene {
  id: string;
  type: "dialogue" | "narration" | "choice" | "lore_card";
  backgroundUrl: string;
  character?: string;
  characterImageUrl?: string;
  dialogue: string;
  choices?: { id: string; text: string; nextSceneId: string; xp?: number }[];
}

export interface Lesson {
  id: string;
  title: string;
  era: string;
  region: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xp_reward: number;
  cover_image: string;
  scenes: Scene[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  lesson_id: string;
  questions: QuizQuestion[];
}

// ─── ACHIEVEMENTS ────────────────────────
export const ACHIEVEMENTS = [
  { id: "a1", name: "First Steps", description: "Complete your first lesson.", rarity: "common" as const, icon: "footprints", xp: 50 },
  { id: "a2", name: "Quiz Champion", description: "Score 100% on any quiz.", rarity: "epic" as const, icon: "crown", xp: 200 },
  { id: "a3", name: "Speed Demon", description: "Answer a question in under 5 seconds.", rarity: "rare" as const, icon: "zap", xp: 100 },
  { id: "a4", name: "Master Historian", description: "Reach Level 36.", rarity: "legendary" as const, icon: "shield", xp: 1000 },
  { id: "a5", name: "Explorer", description: "Visit 3 different eras.", rarity: "rare" as const, icon: "map", xp: 150 },
  { id: "a6", name: "Roman Conqueror", description: "Complete the Fall of Rome lesson.", rarity: "common" as const, icon: "swords", xp: 75 },
  { id: "a7", name: "Samurai Strategist", description: "Complete the Samurai lesson.", rarity: "rare" as const, icon: "swords", xp: 150 },
  { id: "a8", name: "Timeline Traveler", description: "Complete lessons from 3 different eras.", rarity: "epic" as const, icon: "clock", xp: 250 },
  { id: "a9", name: "Streak Warrior", description: "Maintain a 7-day streak.", rarity: "rare" as const, icon: "flame", xp: 200 },
  { id: "a10", name: "Legendary Scholar", description: "Earn 10,000 total XP.", rarity: "legendary" as const, icon: "trophy", xp: 500 },
  { id: "a11", name: "3-Day Streak", description: "Learn for 3 consecutive days.", rarity: "common" as const, icon: "flame", xp: 50 },
  { id: "a12", name: "Level 5", description: "Reach Level 5.", rarity: "common" as const, icon: "star", xp: 100 },
  { id: "a13", name: "Level 10", description: "Reach Level 10.", rarity: "rare" as const, icon: "star", xp: 200 },
  { id: "a14", name: "10 Lessons Done", description: "Complete 10 lessons total.", rarity: "epic" as const, icon: "book", xp: 300 },
  { id: "a15", name: "30-Day Streak", description: "Maintain a 30-day streak.", rarity: "legendary" as const, icon: "flame", xp: 1000 },
];

// ─── SKILL TREE NODES ────────────────────
export const SKILL_NODES = [
  { id: "n1", category: "Ancient Civilizations", name: "Egypt", description: "The dawn of the Pharaohs.", required_xp: 0, prerequisites: [] as string[], position_x: 50, position_y: 8 },
  { id: "n2", category: "Ancient Civilizations", name: "Greece", description: "Birth of democracy and philosophy.", required_xp: 500, prerequisites: ["n1"], position_x: 25, position_y: 25 },
  { id: "n3", category: "Ancient Civilizations", name: "Rome", description: "The eternal city and its empire.", required_xp: 1000, prerequisites: ["n2"], position_x: 75, position_y: 25 },
  { id: "n4", category: "Medieval Kingdoms", name: "Feudal Europe", description: "Knights, castles, and feudal politics.", required_xp: 2000, prerequisites: ["n3"], position_x: 40, position_y: 45 },
  { id: "n5", category: "Asian Dynasties", name: "Tang China", description: "A golden age of culture and innovation.", required_xp: 2000, prerequisites: ["n3"], position_x: 80, position_y: 50 },
  { id: "n6", category: "Medieval Kingdoms", name: "Viking Age", description: "Norse raiders, traders, and explorers.", required_xp: 3000, prerequisites: ["n4"], position_x: 20, position_y: 55 },
  { id: "n7", category: "Asian Dynasties", name: "Mongol Empire", description: "The largest contiguous land empire in history.", required_xp: 3500, prerequisites: ["n5"], position_x: 90, position_y: 65 },
  { id: "n8", category: "Explorers & Discoveries", name: "Age of Sail", description: "Navigating the unknown oceans.", required_xp: 4000, prerequisites: ["n4", "n6"], position_x: 35, position_y: 70 },
  { id: "n9", category: "World Wars", name: "World War I", description: "The war to end all wars.", required_xp: 5000, prerequisites: ["n8"], position_x: 55, position_y: 80 },
  { id: "n10", category: "World Wars", name: "World War II", description: "Global conflict and espionage.", required_xp: 6000, prerequisites: ["n9"], position_x: 50, position_y: 92 },
];

// ─── COMPLETE LESSONS WITH SCENES ────────
export const LESSONS: Lesson[] = [
  {
    id: "fall-of-rome",
    title: "The Last Days of Rome",
    era: "Ancient Civilizations",
    region: "Europe",
    description: "Experience the fall of the Western Roman Empire through the eyes of those who lived it.",
    difficulty: "Medium",
    xp_reward: 250,
    cover_image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800",
    scenes: [
      { id: "1-1", type: "narration", backgroundUrl: "https://images.unsplash.com/photo-1546702302-3370fb5c306d?auto=format&fit=crop&q=80", dialogue: "August, 410 AD. The eternal city of Rome, which has stood for eight hundred years without being conquered, is about to fall." },
      { id: "1-2", type: "dialogue", character: "Alaric I", characterImageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80", backgroundUrl: "https://images.unsplash.com/photo-1546702302-3370fb5c306d?auto=format&fit=crop&q=80", dialogue: "Rome is old. Rome is weak. Today, the Visigoths shall feast in the halls of the Caesars!" },
      { id: "r2", type: "dialogue", character: "Emperor Romulus Augustulus", characterImageUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80", dialogue: "They call me Emperor, but what empire do I rule? The legions have abandoned us. The treasury is empty. And Odoacer marches ever closer with his Germanic warriors.", backgroundUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80" },
      { id: "r3", type: "choice", character: "Senator Cassius", dialogue: "Your Majesty, we must act now. The fate of Rome rests on your decision. What shall we do?", backgroundUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80", choices: [
        { id: "c1", text: "Fortify the walls and prepare for a siege.", nextSceneId: "r4a", xp: 25 },
        { id: "c2", text: "Send envoys to negotiate with Odoacer.", nextSceneId: "r4b", xp: 30 },
      ]},
      { id: "r4a", type: "dialogue", character: "General Orestes", dialogue: "A bold choice, but our walls have held before. I will rally what remains of the garrison. Rome will not fall without a fight.", backgroundUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80" },
      { id: "r4b", type: "dialogue", character: "Senator Cassius", dialogue: "Perhaps wisdom lies in survival rather than pride. Odoacer is a pragmatic man — he may spare the city if we yield gracefully.", backgroundUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80" },
      { id: "r5", type: "lore_card", character: "", dialogue: "HISTORICAL FACT: Romulus Augustulus was the last Western Roman Emperor, deposed on September 4, 476 AD by the Germanic chieftain Odoacer. He was only about 16 years old. Remarkably, Odoacer spared his life and sent him to live in exile in Campania with a pension.", backgroundUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80" },
      { id: "r6", type: "narration", character: "", dialogue: "And so the Western Roman Empire breathed its last. An era spanning over a thousand years came to its end — not with a thunderous battle, but with a quiet surrender. The torch of civilization would pass to new hands.", backgroundUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80" },
    ]
  },
  {
    id: "shadow-rising-sun",
    title: "Shadow of the Rising Sun",
    era: "Asian Dynasties",
    region: "Japan",
    description: "Navigate the complex politics and honor codes of feudal Japan's Samurai era.",
    difficulty: "Hard",
    xp_reward: 350,
    cover_image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
    scenes: [
      { id: "j1", type: "narration", character: "", dialogue: "Japan, 1185 AD. The Genpei War has ended, and Minamoto no Yoritomo stands victorious. A new age dawns — the age of the Samurai. From this moment, warriors will rule Japan for seven centuries.", backgroundUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80" },
      { id: "j2", type: "dialogue", character: "Shogun Yoritomo", dialogue: "The emperor sits in Kyoto playing poetry games while I built this nation with steel and blood. Kamakura shall be our seat of true power. The Shogunate begins today.", backgroundUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80" },
      { id: "j3", type: "choice", character: "Daimyo Takeda", dialogue: "My lord, whispers of rebellion stir in the western provinces. How shall we respond?", backgroundUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80", choices: [
        { id: "jc1", text: "Send spies to infiltrate the rebels.", nextSceneId: "j4a", xp: 30 },
        { id: "jc2", text: "March the army west to crush dissent.", nextSceneId: "j4b", xp: 20 },
      ]},
      { id: "j4a", type: "dialogue", character: "Ninja Master Hattori", dialogue: "A wise decision. The shadows are our greatest weapon. My shinobi will know their plans before they act.", backgroundUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80" },
      { id: "j4b", type: "dialogue", character: "Shogun Yoritomo", dialogue: "Strength must be shown, lest others think us weak. Let the banners fly — we march at dawn.", backgroundUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80" },
      { id: "j5", type: "lore_card", character: "", dialogue: "HISTORICAL FACT: The Kamakura Shogunate (1185–1333) was the first military government in Japanese history. The Samurai code of Bushido — emphasizing loyalty, honor, and martial arts — developed during this period and shaped Japanese culture for centuries.", backgroundUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80" },
    ]
  },
  {
    id: "odins-children",
    title: "Odin's Children",
    era: "Medieval Kingdoms",
    region: "Scandinavia",
    description: "Sail with Viking raiders as they discover new worlds and forge their legendary saga.",
    difficulty: "Medium",
    xp_reward: 300,
    cover_image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&q=80&w=800",
    scenes: [
      { id: "v1", type: "narration", character: "", dialogue: "793 AD. The monastery at Lindisfarne sits peacefully on the Northumbrian coast. The monks have no idea that ships with dragon prows are cutting through the fog toward them. The Viking Age is about to begin.", backgroundUrl: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&q=80" },
      { id: "v2", type: "dialogue", character: "Jarl Ragnar", dialogue: "Look at these lands! Rich with silver and gold, guarded by men who pray instead of fight. Odin smiles upon us this day. Ready the shields!", backgroundUrl: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&q=80" },
      { id: "v3", type: "choice", character: "Jarl Ragnar", dialogue: "We have taken the monastery. But our longships can carry us further. What say you?", backgroundUrl: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&q=80", choices: [
        { id: "vc1", text: "Sail west — there are legends of lands beyond the ocean.", nextSceneId: "v4a", xp: 35 },
        { id: "vc2", text: "Turn south — the rivers of Francia lead to treasure.", nextSceneId: "v4b", xp: 25 },
      ]},
      { id: "v4a", type: "narration", character: "", dialogue: "The longships turned toward the setting sun. Weeks of open ocean tested even the bravest warriors. Then, through the mist, green cliffs emerged — Iceland, a new world waiting to be claimed.", backgroundUrl: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&q=80" },
      { id: "v4b", type: "narration", character: "", dialogue: "The Seine River carried the Viking fleet deep into the heart of Francia. Paris, the jewel of the Frankish kingdom, lay ahead — its walls tall but its defenders unprepared for the fury of the Norsemen.", backgroundUrl: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&q=80" },
      { id: "v5", type: "lore_card", character: "", dialogue: "HISTORICAL FACT: Vikings reached North America around 1000 AD, nearly 500 years before Columbus. Leif Erikson established a settlement at L'Anse aux Meadows in modern-day Newfoundland, Canada.", backgroundUrl: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&q=80" },
    ]
  },
  {
    id: "sands-of-eternity",
    title: "Sands of Eternity",
    era: "Ancient Civilizations",
    region: "Egypt",
    description: "Walk among the pyramids and uncover the mysteries of Ancient Egypt's golden age.",
    difficulty: "Easy",
    xp_reward: 200,
    cover_image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=800",
    scenes: [
      { id: "e1", type: "narration", character: "", dialogue: "2560 BC. The Great Pyramid of Giza nears completion — the greatest construction project the world has ever seen. Twenty years of labor. Two million stone blocks. One pharaoh's dream of eternity.", backgroundUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80" },
      { id: "e2", type: "dialogue", character: "Pharaoh Khufu", dialogue: "When I ascend to join Ra in the heavens, this monument shall guide my soul. Let no man say that Khufu feared death — I have conquered it in stone.", backgroundUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80" },
      { id: "e3", type: "choice", character: "High Priest Hemiunu", dialogue: "The workers grow weary, Great One. The flooding season approaches. What is your command?", backgroundUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80", choices: [
        { id: "ec1", text: "Grant the workers a feast and rest. They have earned it.", nextSceneId: "e4a", xp: 30 },
        { id: "ec2", text: "Press onward. The gods demand perfection on schedule.", nextSceneId: "e4b", xp: 20 },
      ]},
      { id: "e4a", type: "dialogue", character: "High Priest Hemiunu", dialogue: "Your generosity will echo through the ages, my Pharaoh. A well-fed worker builds with devotion, not mere duty.", backgroundUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80" },
      { id: "e4b", type: "dialogue", character: "High Priest Hemiunu", dialogue: "As you command. The overseers will ensure the quotas are met. The monument must be perfect — our legacy demands nothing less.", backgroundUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80" },
      { id: "e5", type: "lore_card", character: "", dialogue: "HISTORICAL FACT: Contrary to popular belief, the pyramids were NOT built by slaves. Archaeological evidence shows the workers were well-fed Egyptian laborers who were paid, received medical care, and were buried with honor near the pyramids they built.", backgroundUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80" },
    ]
  },
  {
    id: "spy-of-berlin",
    title: "The Spy of Berlin",
    era: "World Wars",
    region: "Europe",
    description: "Go undercover in WWII Berlin as an Allied intelligence operative in a high-stakes spy thriller.",
    difficulty: "Hard",
    xp_reward: 400,
    cover_image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&q=80&w=800",
    scenes: [
      { id: "b1", type: "narration", character: "", dialogue: "Berlin, 1943. The war has turned against the Third Reich, but the Nazi machine grinds on. You are Agent Nightingale, deep undercover in the heart of enemy territory. Your mission: intercept Operation Valkyrie intelligence.", backgroundUrl: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&q=80" },
      { id: "b2", type: "dialogue", character: "Handler (Radio)", dialogue: "Nightingale, this is Bluebird. We've intercepted chatter about a resistance cell within the Wehrmacht itself. German officers are plotting against Hitler. Make contact — carefully.", backgroundUrl: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&q=80" },
      { id: "b3", type: "choice", character: "Colonel von Stauffenberg", dialogue: "You claim to be a friend of freedom. But how do I know you aren't Gestapo? Everyone in Berlin has two faces.", backgroundUrl: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&q=80", choices: [
        { id: "bc1", text: "Share your Allied intelligence code as proof.", nextSceneId: "b4a", xp: 35 },
        { id: "bc2", text: "Reveal the location of the hidden radio transmitter.", nextSceneId: "b4b", xp: 25 },
      ]},
      { id: "b4a", type: "dialogue", character: "Colonel von Stauffenberg", dialogue: "That code... only London would know it. Very well, Nightingale. We are planning something that will change the course of the war. The briefcase bomb will be placed on July 20th.", backgroundUrl: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&q=80" },
      { id: "b4b", type: "dialogue", character: "Colonel von Stauffenberg", dialogue: "A dangerous gambit, showing your hand like that. But courage is what this hour demands. Listen closely — Operation Valkyrie is real, and it happens in three days.", backgroundUrl: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&q=80" },
      { id: "b5", type: "lore_card", character: "", dialogue: "HISTORICAL FACT: The July 20 Plot (Operation Valkyrie) was a real assassination attempt against Adolf Hitler on July 20, 1944. Colonel Claus von Stauffenberg placed a bomb in Hitler's conference room, but Hitler survived. Over 7,000 people were arrested in the aftermath.", backgroundUrl: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&q=80" },
    ]
  },
];

// ─── QUIZZES ─────────────────────────────
export const DEMO_QUIZZES: Quiz[] = [
  {
    id: "q-rome",
    lesson_id: "fall-of-rome",
    questions: [
      { question: "Who was the last Western Roman Emperor?", options: ["Augustus", "Romulus Augustulus", "Julius Caesar", "Nero"], correctIndex: 1, explanation: "Romulus Augustulus was deposed in 476 AD by Odoacer, marking the end of the Western Roman Empire." },
      { question: "Which Germanic tribe sacked Rome in 410 AD?", options: ["The Vandals", "The Huns", "The Visigoths", "The Franks"], correctIndex: 2, explanation: "Led by Alaric I, the Visigoths sacked Rome in 410 AD, shocking the ancient world." },
      { question: "What year is traditionally cited as the fall of the Western Roman Empire?", options: ["410 AD", "476 AD", "330 AD", "500 AD"], correctIndex: 1, explanation: "476 AD is the traditional date, when Odoacer deposed Romulus Augustulus." },
      { question: "Which emperor split the Roman Empire into East and West?", options: ["Constantine", "Augustus", "Diocletian", "Trajan"], correctIndex: 2, explanation: "Diocletian divided the empire in 285 AD to make it more manageable." },
    ]
  },
  {
    id: "q-japan",
    lesson_id: "shadow-rising-sun",
    questions: [
      { question: "What was the first military government in Japan called?", options: ["Tokugawa Shogunate", "Meiji Government", "Kamakura Shogunate", "Heian Court"], correctIndex: 2, explanation: "The Kamakura Shogunate (1185–1333) was the first military government (bakufu) in Japanese history." },
      { question: "Who founded the Kamakura Shogunate?", options: ["Tokugawa Ieyasu", "Minamoto no Yoritomo", "Oda Nobunaga", "Emperor Meiji"], correctIndex: 1, explanation: "Minamoto no Yoritomo established the Kamakura Shogunate after winning the Genpei War." },
      { question: "What is the samurai code of honor called?", options: ["Seppuku", "Bushido", "Karate", "Zen"], correctIndex: 1, explanation: "Bushido ('Way of the Warrior') is the moral code concerning attitudes, behavior, and lifestyle of the Samurai." },
    ]
  },
  {
    id: "q-egypt",
    lesson_id: "sands-of-eternity",
    questions: [
      { question: "Which pharaoh commissioned the Great Pyramid of Giza?", options: ["Tutankhamun", "Ramesses II", "Khufu", "Cleopatra"], correctIndex: 2, explanation: "Pharaoh Khufu (also known as Cheops) built the Great Pyramid around 2560 BC." },
      { question: "Were the pyramids built by slaves?", options: ["Yes, entirely by slaves", "No, by paid laborers", "By prisoners of war", "By foreign workers"], correctIndex: 1, explanation: "Archaeological evidence shows the pyramids were built by well-fed, paid Egyptian laborers who received medical care." },
    ]
  },
];

// ─── LEADERBOARD DEMO DATA ──────────────
export const DEMO_USERS = [
  { id: "u1", username: "AlexanderTheGreat", xp: 15420, level: 31, streak: 45, avatar: "🏛️" },
  { id: "u2", username: "CleopatraVII", xp: 14200, level: 28, streak: 38, avatar: "👑" },
  { id: "u3", username: "SunTzu", xp: 13850, level: 27, streak: 52, avatar: "⚔️" },
  { id: "u4", username: "JoanOfArc", xp: 12100, level: 24, streak: 22, avatar: "🛡️" },
  { id: "u5", username: "Genghis_Khan", xp: 11200, level: 22, streak: 31, avatar: "🏹" },
  { id: "u6", username: "Leonardo_DV", xp: 10500, level: 21, streak: 19, avatar: "🎨" },
  { id: "u7", username: "Nefertiti", xp: 9800, level: 19, streak: 28, avatar: "✨" },
  { id: "u8", username: "VikingRagnar", xp: 9200, level: 18, streak: 15, avatar: "⚡" },
  { id: "u9", username: "Confucius", xp: 8700, level: 17, streak: 42, avatar: "📜" },
  { id: "u10", username: "SpartacusX", xp: 8100, level: 16, streak: 11, avatar: "🗡️" },
];
