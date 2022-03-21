import React, { useState } from "react";
import { supabase } from "../../utils/SupabaseClient";
import Draggable from "react-draggable";
import SpotifyPlaylist from "./SpotifyPlaylist";

export default function SpotifyConnect() {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);

  async function signout() {
    const { error } = await supabase.auth.signOut();
  }

  async function spotifyLogin() {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn({
        provider: "spotify",
      });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }
  return !session ? (
    <>
      <button className="button block" onClick={() => spotifyLogin()}>
        Login with Spotify
      </button>
    </>
  ) : (
    <>
      <button className="button block" onClick={() => signOut()}>
        Sign Out
      </button>
      <Draggable>
        <div className="box">
          <Widget Component={SpotifyPlaylist} width={"60%"} height={"200px"} />
          <Account key={session.user.id} session={session} />
        </div>
      </Draggable>

      <Account key={session.user.id} session={session} />
    </>
  );
}
