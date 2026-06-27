import { create } from "zustand";
import { apiClient, setAccessToken } from "@/lib/api-client";

export interface UserProfile {
  avatar_url?: string;
  bio?: string;
  company?: string;
  location?: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  is_active: boolean;
  github_id?: number | null;
  created_at: string;
  updated_at: string;
  profile?: UserProfile | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Listen for session expiry event from API client
  if (typeof window !== "undefined") {
    window.addEventListener("auth-session-expired", () => {
      set({ user: null, isAuthenticated: false, isLoading: false });
    });
  }

  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    clearError: () => set({ error: null }),

    login: async (usernameOrEmail, password) => {
      set({ isLoading: true, error: null });
      try {
        const response = await apiClient.post("/auth/login", {
          username_or_email: usernameOrEmail,
          password,
        });
        const { access_token } = response.data;
        
        // Cache token in memory
        setAccessToken(access_token);
        
        // Fetch current user details
        const userResponse = await apiClient.get("/auth/me");
        
        set({
          user: userResponse.data,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (err: any) {
        set({
          isLoading: false,
          error: err.error?.message || "Failed to log in. Please try again.",
        });
        throw err;
      }
    },

    register: async (email, username, password) => {
      set({ isLoading: true, error: null });
      try {
        await apiClient.post("/auth/register", {
          email,
          username,
          password,
        });
        set({ isLoading: false });
      } catch (err: any) {
        set({
          isLoading: false,
          error: err.error?.message || "Registration failed. Please try again.",
        });
        throw err;
      }
    },

    logout: async () => {
      set({ isLoading: true });
      try {
        await apiClient.post("/auth/logout");
      } catch (err) {
        console.error("Logout failed", err);
      } finally {
        setAccessToken(null);
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    },

    checkAuth: async () => {
      // Avoid triggering check authentication if already authenticated
      if (get().isAuthenticated) return;
      
      set({ isLoading: true, error: null });
      try {
        // Attempt token rotation. Since access token might be empty on startup, 
        // the client interceptor or a manual post will check for valid refresh cookies.
        const response = await apiClient.post("/auth/refresh", {});
        const { access_token } = response.data;
        setAccessToken(access_token);
        
        const userResponse = await apiClient.get("/auth/me");
        set({
          user: userResponse.data,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (err) {
        // Safe to ignore on startup - user is simply unauthenticated
        setAccessToken(null);
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    },
  };
});
