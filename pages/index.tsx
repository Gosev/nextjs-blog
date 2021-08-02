import Head from 'next/head'
import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../styles/Home.module.css'

const items = [
  'en React',
  'en NextJs',
  'en TypeScript',
  'en Javascript'
]

export default function Home() {

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setTimeout(() => setCurrent((current + 1) % items.length), 5000);
  }, [current])
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 id="rotate-title" className={styles.title}>
          S'apprendre à coder<br/>
          {items.map((item, index) => <strong className={(index == current) ? 'is-visible' : 'is-hidden'}
            style={{
              display: (index == current) ? 'flex' : 'none'
          }} key={index}> {item} </strong>)}
        </h1>


        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Blog &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
