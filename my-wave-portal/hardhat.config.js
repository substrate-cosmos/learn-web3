require("@nomiclabs/hardhat-waffle");

require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      // This value will be replaced on runtime
      url: process.env.STAGING_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

// first deploy contract 0x13eF850E396763e95bE5b038C8F04E040eBF7C1A
// second deploy contract 0xe7bd31d3B6A8Fc6974454f510F74D1986Bc625e0
// third deploy contract 0xa487bFD3b6B838a82f638Fa31b90a3d1E8232e02
// four deploy contract 0x82C8B5a30F1a5A5d009Df88ff3a7B694b2821309
// fifth deploy contract 0x804f308CDe088dfbFB42fDdEC2af446D037C4D7D
