import { createClient } from "@supabase/supabase-js";

// Browser-safe client (uses publishable key, RLS enforced)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-only client (bypasses RLS — never import from client components)
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

export type Registration = {
  id: string;
  email: string;
  gender: "M" | "F";
  lang: string;
  created_at: string;
};
