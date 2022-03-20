import Head from "next/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faIdCard } from '@fortawesome/free-solid-svg-icons'
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import ExpressionsEditor from "./ExpressionsEditor";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import { supabase } from "../utils/SupabaseClient";
import Auth from "../components/Auth";
import Avatar from "../components/Avatar"

import Account from "../components/Account";
import Link from 'next/link'


export default function Home() {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [imageForExpressionUrl, setImageForExpressionUrl] = useState(null)
  const [userExpressing, setUserExpressing] = useState(true)

  const [uploading, setUploading] = useState(false)

   const [session, setSession] = useState(null)

    useEffect(() => {
      setSession(supabase.auth.session())

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Expressions4Peace</title>
        <meta name="description" content="Collaborative Expressions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <div className="box container" style={{ padding: '50px 0 100px 0' }}>

   
{!session ? <Link href="/MagicLink"><a>
  
  <FontAwesomeIcon icon={faIdCard} />
  
  </a></Link> : 

<img
          src={session.user.avatarUrl}
          alt="Avatar"
          className="avatar image"
          style={{ height: 200, width: 200 }}
        />

//<Account key={session.user.id} session={session} />

}
</div>
        {/* <Draggable className="box">
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      </div>
      </Draggable> */}
        <Draggable>
          <div  className="box">
            <Widget
              Component={ExpressionsEditor}
              width={"60%"}
              height={"200px"}
            />
            {/* <ExpressionsList /> */}
          </div>
        </Draggable>

        {/* <Draggable> */}
      
                  {/* </Draggable> */}

        {/* <Draggable>
          <div  className="box">
            <h1>here a playlist</h1>
          </div>
        </Draggable> */}

        {/* <Draggable>
          <div>
          <QuotesForPeace/>
          </div>
        </Draggable> */}
        {/* <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label> */}
        {/* <Draggable>
          <div className="box">
            <Image4Expression
              url={imageForExpressionUrl}
              size={200}
              onUpload={(url) => {
                setImageForExpressionUrl(url);
              }}/>
           
            
          </div>
        </Draggable> */}
        {/* ... */}
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

const ExpressionsList = () => {
  return <></>;
};

const ExpressionItem = () => {
  return <></>;
};

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
