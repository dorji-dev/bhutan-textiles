import { supabase } from './auth';

export interface ArtisanProfile {
  id: string;
  user_id: string;
  specialty: string;
  experience_years: number;
  bio: string;
  location: string;
  created_at: string;
  updated_at: string;
  user?: {
    full_name: string;
    email: string;
  };
}

export async function getArtisanProfiles(): Promise<ArtisanProfile[]> {
  const { data: profiles, error } = await supabase
    .from('artisan_profiles')
    .select(`
      *,
      user:users (
        full_name,
        email
      )
    `);

  if (error) throw error;
  return profiles;
}

export async function getArtisanProfile(userId: string): Promise<ArtisanProfile | null> {
  const { data: profile, error } = await supabase
    .from('artisan_profiles')
    .select(`
      *,
      user:users (
        full_name,
        email
      )
    `)
    .eq('user_id', userId)
    .single();

  if (error) return null;
  return profile;
}

export async function createArtisanProfile(profile: Omit<ArtisanProfile, 'id' | 'created_at' | 'updated_at' | 'user'>) {
  const { data, error } = await supabase
    .from('artisan_profiles')
    .insert([profile])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateArtisanProfile(
  userId: string,
  updates: Partial<Omit<ArtisanProfile, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'user'>>
) {
  const { data, error } = await supabase
    .from('artisan_profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}