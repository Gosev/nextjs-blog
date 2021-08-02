import Document, { Html, Head, Main, NextScript } from 'next/document'

declare global {
  interface Window {
    /* tslint:disable no-any */
    dataLayer: any;
    /* tslint:enable no-any */
  }
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Noto+Sans&display=swap" rel="stylesheet" />

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SHZ4CYZVX3"></script>
        <script dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag() { 
            window.dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', 'G-SHZ4CYZVX3');`}}
        />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument