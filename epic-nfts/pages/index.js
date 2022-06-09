import Head from "next/head";
import React from "react";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "";
const TOTAL_MINT_COUNT = 50;

export default function Home() {
  // Render Methods
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  return (
    <div className="container">
      <Head>
        <title>NFT Hero Names</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">My NFT Collection</h1>

        <p className="sub-text">
          Each unique. Each beautiful. Discover your NFT today.
        </p>

        {renderNotConnectedContainer()}
      </main>

      <div className="footer-container">
        <img
          alt="Twitter Logo"
          className="twitter-logo"
          src="/twitter-logo.svg"
        />
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`built on @${TWITTER_HANDLE}`}</a>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          background-color: #0d1116;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          background: -webkit-linear-gradient(left, #60c657 30%, #35aee2 60%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .title,
        .description {
          text-align: center;
        }

        .sub-text {
          font-size: 25px;
          color: white;
        }

        .logo {
          height: 1em;
        }

        .twitter-logo {
          width: 35px;
          height: 35px;
        }

        .footer-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 30px;
        }

        .footer-text {
          color: white;
          font-size: 16px;
          font-weight: bold;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, Inter, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;

          webkit-font-smoothing: antialiased;
          moz-osx-font-smoothing: grayscale;
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New,
            monospace;
        }
      `}</style>
    </div>
  );
}
