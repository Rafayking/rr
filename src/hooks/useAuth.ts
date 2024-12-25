import { create } from 'zustand';
import { supabase, signIn } from '../lib/supabase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginAsAdmin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,

  login: async (email: string, password: string) => {
    const { user, profile } = await signIn(email, password);
    
    if (!profile) throw new Error('Profile not found');

    set({ user: {
      id: user.id,
      email: user.email!,
      role: profile.role,
      username: profile.username,
    }});
  },

  loginAsAdmin: async (email: string, password: string) => {
    const { user, profile } = await signIn(email, password);

    if (!profile || profile.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    set({ user: {
      id: user.id,
      email: user.email!,
      role: 'admin',
      username: profile.username,
    }});
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },

  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        set({ user: {
          id: session.user.id,
          email: session.user.email!,
          role: profile.role,
          username: profile.username,
        }});
      }
    }
  },
}));