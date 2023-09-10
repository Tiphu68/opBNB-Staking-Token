import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="DeFi personal project" />
        <link rel='shortcut icon' href='/logo.png' type='image/png'/>
      </Head>
      <body>
        <Main />
        <div id='modal'/>
        <NextScript />
      </body>
    </Html>
  )
}
