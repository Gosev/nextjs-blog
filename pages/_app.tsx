import React from "react";
import type { ReactElement, ReactNode } from 'react'
import { Header } from '../components/Header'
import '../styles/globals.css'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'



function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  return Component.getLayout ? 
    Component.getLayout(<Component {...pageProps} />)
    : <><Header />
    <Component {...pageProps} />
    </>;
}

export default MyApp
