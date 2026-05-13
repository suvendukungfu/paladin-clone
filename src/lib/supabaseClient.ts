import { createClient } from '@supabase/supabase-js';

// In a real deployment, these would be in .env.local
// Next.js requires NEXT_PUBLIC_ prefix for browser exposure
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
