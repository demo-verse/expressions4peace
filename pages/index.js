import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import ExpressionsEditor from './ExpressionsEditor'

const exampleExpressions = [
  {
    id: 1,
    expression: '1 + 1',
  }
]

const arrayOfQuotes = [
  "\"Peace of mind for five minutes, that's what I crave.\" —Alanis Morissette\"",
  "\"When things change inside you, things change around you.\" —Unknown",
  "\"If you are depressed you are living in the past if you are anxious you are living in the future, if you are at peace, you are living in the present.\" —Lao Tzu"
]


export default function Home() {


  const NavBar = () => {
    return (
      <div className='navBar' style={{ flex: 0, color: "wheat" }}>
        <nav>
        </nav>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Expressions4Peace</title>
        <meta name="description" content="Collaborative Expressions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <Widget Component={ExpressionsEditor} width={'300px'} height={'200px'} />
          <ExpressionsList />
        </div>

      </main>
      <NavBar />

      <footer className={styles.footer}>
        <a
          href="https://demover.se"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image src="/demoverse_horizontal.png" alt="demoVerse logo" width={200} height={62} />
          </span>
        </a>
      </footer>
    </div>
  )
}

const Masthead = () => {
  // Choose random quote from array
  const [quote, setQuote] = useState(arrayOfQuotes[Math.floor(Math.random() * arrayOfQuotes.length)])
  return (
    <div className='masthead'>
      <h1>{quote}</h1>
    </div>
  )
}

const ExpressionsList = () => {
  return (
    <>

    </>
  )
}

const ExpressionItem = () => {
  return (
    <>

    </>
  )
}

//  Pass a component into the widget and render
const Widget = ({Component, width, height}) => {
  return (
    <div className='widget' style={{ width: width, height: height }}>
      <div className="widget-content">
        <Component />
      </div>
    </div>
  )
}
