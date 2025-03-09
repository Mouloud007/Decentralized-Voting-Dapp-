const hre = require("hardhat");

async function main() {
    const Voting = await hre.ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();
    await voting.waitForDeployment(); // Updated syntax for newer Hardhat
    console.log("Voting deployed to:", voting.target); // 'target' is the address in newer versions
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});