import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supaBase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);
function App() {
  const [session, setSession] = useState(null);
  return (
    <>
      <Auth supabaseClient={supaBase} appearance={{ theme: ThemeSupa }} />
    </>
  );
}

export default App;
