require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    solidity: "0.8.0",
    networks: {
        sepolia: {
            url: "https://sepolia.infura.io/v3/<your-infura-project-id>", // Replace with your Infura Project ID
            accounts: ["<your-private-key>"] // Replace with your MetaMask private key
        }
    }
};
