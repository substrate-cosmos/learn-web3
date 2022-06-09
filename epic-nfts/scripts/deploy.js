const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("MyEpicNFT");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contact deployed to: ", nftContract.address);

  let index = 0;
  for (index = 0; index < 5 * 5 * 5; index += 1) {
    // Call the function
    let txn = await nftContract.makeAnEpicNFT();

    // wait for it to be mined.
    await txn.wait();
    console.log("Minted NFT #%d", index);
  }
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

runMain();
