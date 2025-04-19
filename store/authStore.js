// store/authStore.js
"use client";
import { create } from "zustand";
import { supabase } from "@/supabase/supabaseClient";

export const useAuthStore = create((set, get) => ({
  session: null,
  user: null, // { id, email, full_name, phone, avatar_url, role, created_at }
  loading: true,

  init: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ session, loading: false });

    if (session) get().fetchProfile(session.user);

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session });
      if (session) get().fetchProfile(session.user);
      else set({ user: null, loading: false });
    });
  },

  fetchProfile: async (authUser) => {
    set({ loading: true });
    const { data: profile, error } = await supabase
      .from("profiles")
      .select(
        `
        email,
        full_name,
        phone,
        avatar_url,
        role,
        created_at
      `
      )
      .eq("id", authUser.id)
      .single();

    if (error) {
      console.error("fetchProfile error:", error);
      set({ loading: false });
      return;
    }

    set({
      user: {
        id: authUser.id,
        email: profile.email,
        full_name: profile.full_name,
        phone: profile.phone,
        avatar_url: profile.avatar_url,
        role: profile.role,
        created_at: profile.created_at,
      },
      loading: false,
    });
  },

  signUp: async (email, password) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) console.error("signUp error:", error);
    set({ loading: false });
    return data;
  },

  signIn: async (email, password) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) console.error("signIn error:", error);
    set({ loading: false });
    return data;
  },

  signOut: async () => {
    set({ loading: true });
    const { error } = await supabase.auth.signOut();
    if (error) console.error("signOut error:", error);
    set({ user: null, session: null, loading: false });
  },
}));
