// Import the Hardhat toolbox plugin
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    // Specify the Solidity compiler version
    solidity: "0.8.0",
    networks: {
        // Define the configuration for the Sepolia test network
        sepolia: {
            // URL of the Sepolia network node provided by Infura
            url: "https://sepolia.infura.io/v3/08c2c758d9ac43c3bd595071940a9e66",
            // Array of private keys to use for deploying contracts
            accounts: ["0xeb65f6f6bde1bbccf4b13389966b73ae409764472da676fe8e9bd14b71d4162c"] // Ensure this is your key
        }
    }
};