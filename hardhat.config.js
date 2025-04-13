require("@nomicfoundation/hardhat-toolbox");
module.exports = {
    solidity: "0.8.0",
    networks: {
        sepolia: {

            url: "https://sepolia.infura.io/v3/08c2c758d9ac43c3bd595071940a9e66",
            accounts: ["put your new private key here when you deploy the contract"]

        }
    }
};
