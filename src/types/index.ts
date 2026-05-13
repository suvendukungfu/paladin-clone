export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          username: string;
          avatar_url: string;
          xp: number;
          level: number;
          streak_days: number;
          rank_title: string;
          created_at: string;
        }
      };
      lessons: {
        Row: {
          id: string;
          title: string;
          era: string;
          region: string;
          description: string;
          difficulty: string;
          xp_reward: number;
          cover_image: string;
        }
      };
      achievements: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon: string;
          rarity: string;
          xp_reward: number;
        }
      }
    }
  }
}
