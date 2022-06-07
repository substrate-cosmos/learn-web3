const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract deployed to: ", waveContract.address);
  console.log("Contract deployed by: ", owner.address);

  // get Contract balance 
  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

  let totalWaveAddressCount;

  // get total wave
  let allWaveCount = await waveContract.getTotalWaves();
  console.log(allWaveCount.toNumber());

  // send a few waves!
  let waveTxn1 = await waveContract.wave("This is wave #1");
  await waveTxn1.wait(); // Wait for the transaction to be mined

  // send a few waves!
  let waveTxn2 = await waveContract.wave("This is wave #2");
  await waveTxn2.wait(); // Wait for the transaction to be mined

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance", hre.ethers.utils.formatEther(contractBalance));


  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating "Uncaught fatal exception" error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
