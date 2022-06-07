const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Contract deployed to: ", waveContract.address);
  console.log("Contract deployed by: ", owner.address);

  let totalWaveAddressCount;

  // get total wave
  let allWaveCount = await waveContract.getTotalWaves();
  // totalWaveAddressCount = await waveContract.getTotalArrayWavePerson();
  console.log(allWaveCount.toNumber());
  // console.log(totalWaveAddressCount);

  // send a few waves!
  let waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait(); // Wait for the transaction to be mined

  waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
  await waveTxn.wait(); // Wait for the transaction to be mined

  allWaveCount = await waveContract.getTotalWaves();
  // totalWaveAddressCount = await waveContract.getTotalArrayWavePerson();
  console.log(allWaveCount.toNumber());
  // console.log(totalWaveAddressCount);

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
