import Head from 'next/head'
import React from 'react';
import { useState } from 'react';
import styles from '../styles/Home.module.css'

//import {ConvertKitForm} from 'convertkit-react'

const MY_FORM_ID = 2615067

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Kodaps - Newsletter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      {/* <ConvertKitForm formId={MY_FORM_ID} /> */}
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





/*


*/