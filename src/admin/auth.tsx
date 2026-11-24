import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getSession,
  isAdmin,
  signIn as apiSignIn,
  signOut as apiSignOut,
  supabaseEnabled,
  type Session,
} from "@/lib/supabase";

export type AuthStatus = "checking" | "unconfigured" | "signedOut" | "notAdmin" | "admin";

type AuthValue = {
  status: AuthStatus;
  email: string | undefined;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  /** A valid access token for write requests (refreshes it if needed). */
  token: () => Promise<string>;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>(supabaseEnabled ? "checking" : "unconfigured");
  const [session, setSession] = useState<Session | null>(null);

  const adopt = useCallback(async (s: Session | null) => {
    setSession(s);
    if (!s) return setStatus("signedOut");
    try {
      setStatus((await isAdmin(s)) ? "admin" : "notAdmin");
    } catch {
      setStatus("signedOut");
    }
  }, []);

  useEffect(() => {
    if (!supabaseEnabled) return;
    getSession().then(adopt);
  }, [adopt]);

  const value = useMemo<AuthValue>(
    () => ({
      status,
      email: session?.user.email,
      signIn: async (email, password) => {
        await adopt(await apiSignIn(email, password));
      },
      signOut: async () => {
        await apiSignOut(session);
        setSession(null);
        setStatus("signedOut");
      },
      token: async () => {
        const s = await getSession();
        if (!s) {
          setSession(null);
          setStatus("signedOut");
          throw new Error("Your session has expired. Please sign in again.");
        }
        return s.access_token;
      },
    }),
    [status, session, adopt],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}
