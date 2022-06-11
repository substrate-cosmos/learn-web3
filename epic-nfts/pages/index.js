import Head from "next/head";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import myEpicNft from "./utils/MyEpicNFT.json";

// Constants
const TWITTER_HANDLE = "TheLongSnow";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "";
const TOTAL_MINT_COUNT = 50;

// I moved the contract address to the top for easy access.
const CONTRACT_ADDRESS = "0xec13A42E0FDe0E3F1c3C69065aE06b0143012A0C";

export default function App() {
  // just a state variable we use to store our user's public wallet,
  // Don't forget to impot useState
  const [currentAccount, setCurrentAccount] = useState("");
  const [TotalNFTsMintedSoFar, setTotalNFTsMintedSoFar] = useState(0);

  const checkIfWalletIsConnected = async () => {
    // fist make sure we have access to window.ethereum
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have matamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    let chainId = await ethereum.request({method: "eth_chainId"});
    console.log("Connected to chain " + chainId);
    
    // String, hex code of the chainId of the Rinkebey test network
    const rinkebyChianId = "0x4";
    if (chainId !== rinkebyChianId) {
      alert("You are not connected to the Rinkeby Test Network!");
    }

    // check is we're authorized to access the user's wallet
    const accounts = await ethereum.request({ method: "eth_accounts" });

    // user can have multiple authorized accounts, we grab the first one if tis there!
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);

      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY their wallet connected + authorized.
      setupEventListener();
      getTotalNFTsMintedSoFar();
    } else {
      console.log("No authorized account found");
    }
  };

  // implement your connect wallet method here
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      } else {
        // fancy method to request access to account.
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        // boom! this should print out public address once we authorized metamask
        console.log("Connected: ", accounts[0]);
        setCurrentAccount(accounts[0]);

        // Setup listener! This is for the case where a user comes to our site
        // and connected their wallet for the first time.
        setupEventListener();
        getTotalNFTsMintedSoFar();
      }
    } catch (err) {
      console.log(err);
    }
  };


  const getTotalNFTsMintedSoFar = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        // use contractABI
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );

        let count = await connectedContract.getTotalNFTsMintedSoFar();
        setTotalNFTsMintedSoFar(count.toNumber());
        console.log(count.toNumber());
        return count.toNumber();
      } else {
        console.log("Ethereum object does't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Setup our listener.
  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );

        // This is the magic sauce.
        // this will essentially "Capture" our event when our contract throw it.
        // If you're familier with webhooks, It's very similar to that!
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber());
          alert(
            `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          );
        });

        console.log("Setup event listener!");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );

        console.log("Goging to pop wallet now to pay gas ...");
        let nftTxn = await connectedContract.makeAnEpicNFT();

        console.log("Mining...... Please wait.");
        await nftTxn.wait();

        console.log(
          `Mined. seee transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
        getTotalNFTsMintedSoFar();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // this runs our function when pags load.
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button
      onClick={connectWallet}
      className="cta-button connect-wallet-button"
    >
      Connect to Wallet
    </button>
  );

  const renderMintUI = () => (
    <button
      onClick={askContractToMintNft}
      className="cta-button connect-wallet-button"
    >
      Mint NFT
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

        {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}

        <div> {TotalNFTsMintedSoFar} / 50 NFTs minted so far </div>

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
