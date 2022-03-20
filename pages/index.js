import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import ExpressionsEditor from "./ExpressionsEditor";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import { supabase } from "../utils/SupabaseClient";
import Auth from "../components/Auth";
import updateProfile from "../components/Account";
import Image4Expression from "../components/Image4Expression";
import Expression4Peace from "../components/Expression4Peace";
import Account from "../components/Account";
import QuotesForPeace from '../pages/api/quotes/QuotesForPeace'
import Link from 'next/link'

const exampleExpressions = [
  {
    id: 1,
    expression: "1 + 1",
  },
];

// quotes, related to peace, love and hence, quotes of people
// all, feel free to extend and add other people or theirs if not existed here.
// they could be as well, parts from lyrics, talks, books, anywhere.
// with one condition:  their sources/references should be publicly accessible and contained w/ proposal (eg. adding a sound url to )
// here will contain only verified quotes and will be these on www.demoVer.se
// as they are referred, all that add expression, will gain
// $peace, $wisdom, $respect by referring some of those they'd like.
const arrayOfQuotes = [
  "A dream you dream alone is only a dream. A dream you dream together is reality. —Yoko Ono",
  "If someone thinks that peace and love are just a cliche that must have been left behind in the 60s, that’s a problem. Peace and love are eternal. -John Lennon",
  "Peace of mind for five minutes, that's what I crave. —Alanis Morissette",
  "When things change inside you, things change around you. —Unknown",
  "Everyone thinks of changing the world, but no one thinks of changing himself. — Leo Tolstoy",
  "If you are depressed you are living in the past if you are anxious you are living in the future, if you are at peace, you are living in the present.—Lao Tzu",
  "Peace cannot be kept by force; it can only be achieved by understanding. —Albert Einstein",
  "Sometimes it falls upon a generation to be great. You can be that generation. —Nelson Mandela",
  "I’ve learnt that no one is too small to make a difference. Your silence is almost worst of all. —Greta Thunberg ",
  "Let the world unite, no fussing no fighting. —Paulette Walker",
  "If we are to have peace on earth.. Our loyalties must transcend our race, our tribe, our class, and our nation; and this means we must develop a world perspective. —Martin Luther King, Jr.",
  "If we have no peace, it is because we have forgotten that we belong to each other. —Mother Teresa",
  "The day the power of love overrules the love of power, the world will know peace. —Mahatma Gandhi",
  "A post-truth democracy would no longer be a democracy. —Jürgen Habermas",
  "Why only one song, one speech, one text at a time? when our lips speak together. —Luce Irigaray",
  "If everyone fought for their own convictions there would be no war. —Leo Tolstoy",
  "Words can do unspeakable good and cause terrible wounds. —Sigmund Freud",
  "The question is not what you look at, but what you see. —Henry David Thoreau",
  "A concept is a brick. It can be used to build a courthouse of reason or it can be thrown through the window. —Gilles Deleuze",
  "No Man is an Island. —John Donne",
];

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

   
{!session ? <Link href="/MagicLink"><a>Login/Join</a></Link> : 
<Account key={session.user.id} session={session} />}
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
