import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import Auth from "./Auth";
import Account from "./Account";

function App() {
  const [session, setSession] = useState<Session | null>();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  console.log(session);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}

export default App;
