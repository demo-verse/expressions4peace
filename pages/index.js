import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import ExpressionsEditor from "./ExpressionsEditor";
import Draggable from "react-draggable";
import { supabase } from "../utils/SupabaseClient";
import CalendarBox from "../components/CalendarBox";
import SpotifyPlaylist from "../components/artOfPeace/SpotifyPlaylist";

import Account from "../components/Account";
import Link from "next/link";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Expressions4Peace</title>
        <meta name="description" content="Collaborative Expressions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="box container" style={{ padding: "50px 0 100px 0" }}>
          {!session ? (
            <>
              <Link href="/MagicLink">
                <a>Login/Join</a>
              </Link>
            </>
          ) : (
            <>
              <Draggable>
                <div className="box">
                  <CalendarBox />
                </div>
              </Draggable>

              <Draggable>
                <div className="box">
                  <Widget
                    Component={ExpressionsEditor}
                    width={"60%"}
                    height={"200px"}
                  />
                </div>
              </Draggable>

              <Draggable>
                <div className="box">
                  <Widget
                    Component={<Account key={session.user.id} session={session} />}
                    width={"100%"}
                    height={"200px"}
                  />
      
                </div>
              </Draggable>
            </>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://demover.se" target="_blank" rel="noopener noreferrer">
          <span className={styles.logo}>
            <Image
              src="/demoverse_horizontal.png"
              alt="demoVerse logo"
              width={200}
              height={62}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}

//  Pass a component into the widget and render
const Widget = ({ Component, width, height }) => {
  return (
    <div className="widget" style={{ width: width, height: height }}>
      <div className="widget-content">
        <Component />
      </div>
    </div>
  );
};
