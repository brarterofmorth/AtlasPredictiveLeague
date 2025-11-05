const hre = require("hardhat");
async function main() {
  const AtlasPredictiveLeague = await hre.ethers.getContractFactory("AtlasPredictiveLeague");
  const contract = await AtlasPredictiveLeague.deploy();
  await contract.waitForDeployment();
  console.log("AtlasPredictiveLeague deployed to:", await contract.getAddress());
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
