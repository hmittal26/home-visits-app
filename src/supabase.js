import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tggrmydstvdyncfuozog.supabase.co";
const supabaseAnonKey = "sb_publishable_5IR6Hdmm9YuQs10ZKKqiig_boP6iKZl";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);