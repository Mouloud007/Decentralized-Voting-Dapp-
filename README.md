# Decentralized Voting dApp

This is a simple decentralized voting application built with Solidity, Hardhat, and a frontend using Web3.js. The application allows users to add votes and like existing votes on the Ethereum blockchain.

![Voting dApp Screenshot](https://github.com/Mouloud007/Decentralized-Voting-Dapp-/blob/main/voting%20dapp.png)

## Features

- Add a new vote with a given name
- Like a vote at a given index
- Retrieve and display all votes

## Prerequisites

- Node.js and npm installed
- MetaMask browser extension installed and connected to the Sepolia test network
- Some Sepolia test ETH for transactions

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/Mouloud007/Decentralized-Voting-Dapp.git
cd Decentralized-Voting-Dapp
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Compile and Deploy the Smart Contract

Use Hardhat to compile and deploy your smart contract to the Sepolia test network.

```sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

Ensure you have a `deploy.js` script in the `scripts` folder that handles the deployment of your `Voting` contract.

### 4. Start a Local Server

Serve your frontend files using a local server. You can use a simple HTTP server like `http-server`.

First, install `http-server` globally if you haven't already:

```sh
npm install -g http-server
```

Then, navigate to your frontend directory and start the server:

```sh
cd frontend
http-server
```

### 5. Open the Application

Open your web browser and navigate to the local server URL, typically `http://localhost:8080`.

### 6. Connect MetaMask

Ensure you have MetaMask installed in your browser and connected to the Sepolia test network. You will need some Sepolia test ETH to interact with the contract.

### 7. Interact with the dApp

You should now be able to interact with your decentralized voting application. You can add votes and like existing votes through the web interface.

## Project Structure

- `contracts/Voting.sol`: Solidity smart contract for the voting system
- `frontend/app.js`: JavaScript file to interact with the smart contract using Web3.js
- `frontend/index.html`: HTML file for the frontend interface
- `hardhat.config.js`: Hardhat configuration file

## License

This project is licensed under the MIT License.

