// store/authStore.js
"use client";
import { create } from "zustand";
import { supabase } from "@/supabase/supabaseClient";

export const useAuthStore = create((set, get) => ({
  session: null,
  user: null,
  loading: true,

  init: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ session, loading: false });
    if (session) set({ user: session.user, loading: false });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session });
      if (session) set({ user: session.user, loading: false });
      else set({ user: null, loading: false });
    });
  },

  signUp: async (formData) => {
    set({ loading: true });

    // 1) Create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    if (authError) {
      console.error("Auth signup error:", authError);
      set({ loading: false });
      return { error: authError };
    }

    const userId = authData.user.id;

    // 2) upload files if provided
    const uploads = {};
    if (formData.identificationFile) {
      const file = formData.identificationFile;
      const path = `${userId}/identification-${Date.now()}-${file.name}`;
      const { data: up, error: upErr } = await supabase.storage
        .from("user-documents")
        .upload(path, file);
      if (!upErr) {
        const identification_url = supabase.storage
          .from("user-documents")
          .getPublicUrl(up.path).data.publicUrl;

        uploads.identification_url = identification_url;
      } else {
        console.error("ID upload error:", upErr);
      }
    }

    if (formData.notaryCertificateFile) {
      const file = formData.notaryCertificateFile;
      const path = `${userId}/notary_certificate-${Date.now()}-${file.name}`;
      const { data: up, error: upErr } = await supabase.storage
        .from("user-documents")
        .upload(path, file);
      if (!upErr) {
        const notary_certificate_url = supabase.storage
          .from("user-documents")
          .getPublicUrl(up.path).data.publicUrl;

        uploads.notary_certificate_url = notary_certificate_url;
      } else {
        console.error("Cert upload error:", upErr);
      }
    }

    // 3) Insert the full profile row
    const profilePayload = {
      id: userId,
      email: formData.email,
      sign_up_as: formData.signUpAs,
      full_name: formData.name,
      phone: formData.phone,
      terms_agreed: formData.termsAgreed,
      payment_method: formData.payment_method,
      card_last4: formData.card_number.slice(-4),
      expiry_date: formData.expiry_date,
      role: "user",
      ...uploads,
    };
    const { error: profErr, data } = await supabase
      .from("profiles")
      .insert(profilePayload);
    if (profErr) {
      console.error("Profile insert error:", profErr);
      set({ loading: false });
      return { user: null, error: profErr };
    }

    // 4) Fetch & set the user in your store
    set({ loading: false });

    return { user: get().user, error: null };
  },

  signInWithEmail: async (email, password) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      set({ loading: false });
      throw error;
    }
    set({ loading: false });
    return { data };
  },

  signInWithPhone: async (phone, password) => {
    set({ loading: true });
    // 1) Lookup the email for this phone
    const { data: profile, error } = await supabase
      .from("profiles") // or 'profiles', whichever table holds your phone column
      .select("email")
      .eq("phone", phone)
      .maybeSingle();

    if (error) {
      set({ loading: false });
      throw error;
    }
    if (!profile) {
      set({ loading: false });
      throw new Error("No account found for that phone number.");
    }

    const email = profile.email;

    // 2) Sign in with the found email + provided password
    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      {
        email,
        password,
      }
    );

    if (signInError) {
      set({ loading: false });
      throw signInError;
    }

    set({ loading: false });
    return { data };
  },

  signOut: async () => {
    set({ loading: true });
    const { error } = await supabase.auth.signOut();
    if (error) console.error("signOut error:", error);
    set({ user: null, session: null, loading: false });
  },
}));
