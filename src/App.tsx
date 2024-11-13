import "./App.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Session } from "@supabase/supabase-js";

const supaBase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);
function App() {
  const [session, setSession] = useState<Session | null>();

  const handleSignOut = async () => {
    try {
      const { error } = await supaBase.auth.signOut();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    supaBase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supaBase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  console.log(session);

  if (session) {
    return (
      <>
        <p>You are logged in</p>
        <p onClick={handleSignOut}>Sign out</p>
      </>
    );
  }
  return <Auth supabaseClient={supaBase} appearance={{ theme: ThemeSupa }} />;
}

export default App;
