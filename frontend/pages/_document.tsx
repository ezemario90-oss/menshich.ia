import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Script Paddle */}
          <script src="https://cdn.paddle.com/paddle/paddle.js" />
          <script dangerouslySetInnerHTML={{ __html: `window.Paddle && window.Paddle.Setup({ vendor: ${process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID} });` }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
