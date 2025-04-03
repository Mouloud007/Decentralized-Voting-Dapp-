require("@nomicfoundation/hardhat-toolbox");
module.exports = {
    solidity: "0.8.0",
    networks: {
        sepolia: {
            url: "https://sepolia.infura.io/v3/08c2c758d9ac43c3bd595071940a9e66",
            accounts: ["0xeb65f6f6bde1bbccf4b13389966b73ae409764472da676fe8e9bd14b71d4162c"]
        }
    }
};