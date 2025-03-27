// Import the Hardhat toolbox plugin
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    // Specify the Solidity compiler version
    solidity: "0.8.0",
    networks: {
        // Define the configuration for the Sepolia test network
        sepolia: {
            // URL of the Sepolia network node provided by Infura
            url: "",
            // Array of private keys to use for deploying contracts
            accounts: [""] // Ensure this is your key
        }
    }
};
