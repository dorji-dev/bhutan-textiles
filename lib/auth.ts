import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const supabase = createClientComponentClient();

export type AuthUser = {
  id: string;
  email: string;
  full_name: string;
  role: 'customer' | 'artisan';
};

export async function signUp(email: string, password: string, full_name: string, role: 'customer' | 'artisan') {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  // Insert user profile data
  const { error: profileError } = await supabase
    .from('users')
    .insert([{ 
      id: authData.user?.id,
      email,
      full_name,
      role,
    }]);

  if (profileError) throw profileError;

  return { user: authData.user };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Get user profile data
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profileError) throw profileError;

  return { user: profile };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !session) return null;

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (profileError) return null;

  return profile;
}