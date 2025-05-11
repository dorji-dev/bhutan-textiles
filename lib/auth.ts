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

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) return null;

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();

  return profile;
}