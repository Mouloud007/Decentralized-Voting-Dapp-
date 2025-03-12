// Initialize Web3 instance using MetaMask's provider
const web3 = new Web3(window.ethereum);

// Address of the deployed Voting contract
const contractAddress = "0x073D57f090eC844e9e103C302e1a2BcaD7f0A92f";

// ABI (Application Binary Interface) of the Voting contract
const contractABI = [
    {
        "inputs": [{"internalType": "string", "name": "_name", "type": "string"}],
        "name": "addVote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "_index", "type": "uint256"}],
        "name": "likeVote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllVotes",
        "outputs": [{"components": [{"internalType": "string", "name": "name", "type": "string"}, {"internalType": "uint256", "name": "likes", "type": "uint256"}], "internalType": "struct Voting.Vote[]", "name": "", "type": "tuple[]"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// Create a contract instance with the ABI and address
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Connect MetaMask
async function connectMetaMask() {
    if (window.ethereum) {
        // Request account access if needed
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("MetaMask connected");
    } else {
        // Alert the user if MetaMask is not installed
        alert("Please install MetaMask!");
    }
}

// Add a vote
async function addVote() {
    // Get the name from the input field
    const name = document.getElementById("nameInput").value;
    if (!name) return alert("Please enter a name");
    // Get the user's accounts
    const accounts = await web3.eth.getAccounts();
    // Call the addVote function on the contract
    await contract.methods.addVote(name).send({ from: accounts[0] });
    // Clear the input field
    document.getElementById("nameInput").value = "";
    // Reload the votes
    loadVotes();
}

// Load and display all votes
async function loadVotes() {
    // Get the vote list element
    const voteList = document.getElementById("voteList");
    voteList.innerHTML = "";
    // Call the getAllVotes function on the contract
    const votes = await contract.methods.getAllVotes().call();
    // Display each vote
    votes.forEach((vote, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${vote.name} - Likes: ${vote.likes} <button class="conservative" onclick="likeVote(${index})">Like</button>`;
        voteList.appendChild(li);
    });
}

// Like a vote
async function likeVote(index) {
    // Get the user's accounts
    const accounts = await web3.eth.getAccounts();
    // Call the likeVote function on the contract
    await contract.methods.likeVote(index).send({ from: accounts[0] });
    // Reload the votes
    loadVotes();
}

// Initialize the app
window.onload = async () => {
    // Connect to MetaMask and load votes on page load
    await connectMetaMask();
    loadVotes();
};