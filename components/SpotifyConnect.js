import React, { useState } from "react";
import { supabase } from '../utils/SupabaseClient'


export default function SpotifyConnect() {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);

  

  
  //   async function signInWithSpotify() {
      //     const { user, session, error } = await supabase.auth.signIn({
          //       provider: 'spotify',
          //     })
          //   }
          
          async function signout() {
            const { error } = await supabase.auth.signOut();
          }

          async function spotifyLogin() {
            try {
              setLoading(true);
              const { user, session, error } = await supabase.auth.signIn({
                provider: "spotify",
              });
          
              console.log(
                "user's name logged in w/ spotify >> (session.user.name)",
                session.user.name
              );
              console.log(
                "user fetched in w/ spotify >> (user obj stringified)",
                JSON.stringify(user)
              );
          
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
        Connect w/ Spotify
      </button>
    </>
  ) : (
    <>
      <button className="button block" onClick={() => signOut()}>
        signOutSpot
      </button>
      <Draggable>
        <div className="box">
          <Widget
            Component={ExpressionsEditor}
            width={"60%"}
            height={"200px"}
          />
          {/* <ExpressionsList /> */}
        </div>
      </Draggable>
      <Account key={session.user.id} session={session} />
    </>
  );
}
