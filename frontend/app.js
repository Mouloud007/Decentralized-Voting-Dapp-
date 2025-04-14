// Initialize Web3 with safer handling
// This checks if MetaMask (or another Ethereum provider) is available in the browser.
// If it is, we initialize Web3 with the provider. Otherwise, we alert the user to install MetaMask.
let web3;
if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
} else {
    console.error("MetaMask not detected at startup");
    alert("Please install MetaMask to use this DApp!");
}

// Contract details
// Replace this with the address of your deployed smart contract
const contractAddress = "when you deploy the contract put the private key here"; // Replace with your deployed contract address 

// ABI (Application Binary Interface) defines the structure of the smart contract's functions and events
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
    },
    {
        "inputs": [{"internalType": "uint256", "name": "_index", "type": "uint256"}],
        "name": "deleteVote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Initialize the contract instance using Web3
const contract = web3 ? new web3.eth.Contract(contractABI, contractAddress) : null;

// Connect MetaMask with error handling
// This function connects the DApp to MetaMask and requests access to the user's Ethereum account.
async function connectMetaMask() {
    if (!web3) {
        alert("Please install MetaMask!");
        return false;
    }
    try {
        await window.ethereum.request({ method: "eth_requestAccounts" }); // Request account access
        console.log("MetaMask connected");
        return true;
    } catch (error) {
        console.error("MetaMask connection failed:", error);
        alert("Failed to connect MetaMask: " + error.message);
        return false;
    }
}

// Add a vote
// This function allows the user to add a new vote by providing a candidate's name.
async function addVote() {
    if (!web3) return alert("MetaMask not connected");
    const name = document.getElementById("nameInput").value; // Get the candidate's name from the input field
    if (!name) return alert("Please enter a name");
    const accounts = await web3.eth.getAccounts(); // Get the user's Ethereum account
    try {
        // Call the smart contract's addVote function
        await contract.methods.addVote(name).send({ from: accounts[0] });
        document.getElementById("nameInput").value = ""; // Clear the input field
        loadVotes(); // Refresh the list of votes
    } catch (error) {
        console.error("Add vote failed:", error);
        alert("Failed to add vote: " + error.message);
    }
}

// Load and display all votes
// This function fetches all votes from the smart contract and displays them in the UI.
async function loadVotes() {
    const voteList = document.getElementById("voteList"); // Get the HTML element to display the votes
    voteList.innerHTML = "Loading votes...";
    if (!web3) {
        voteList.innerHTML = "Please connect MetaMask to see votes.";
        return;
    }
    try {
        const votes = await contract.methods.getAllVotes().call(); // Fetch all votes from the smart contract
        voteList.innerHTML = ""; // Clear the current list
        votes.forEach((vote, index) => {
            // Create a list item for each vote
            const li = document.createElement("li");
            li.innerHTML = `
                ${vote.name} - Likes: ${vote.likes} 
                <button class="conservative" onclick="likeVote(${index})">Like</button>
                <button class="danger" onclick="deleteVote(${index})">Delete</button>
            `;
            voteList.appendChild(li); // Add the list item to the vote list
        });
    } catch (error) {
        console.error("Load votes failed:", error);
        voteList.innerHTML = "Failed to load votes: " + error.message;
    }
}

// Like a vote
// This function allows the user to like a specific vote by its index.
async function likeVote(index) {
    if (!web3) return alert("MetaMask not connected");
    const accounts = await web3.eth.getAccounts(); // Get the user's Ethereum account
    try {
        // Call the smart contract's likeVote function
        await contract.methods.likeVote(index).send({ from: accounts[0] });
        loadVotes(); // Refresh the list of votes
    } catch (error) {
        console.error("Like vote failed:", error);
        alert("Failed to like vote: " + error.message);
    }
}

// Delete a vote
// This function allows the user to delete a specific vote by its index.
async function deleteVote(index) {
    if (!web3) return alert("MetaMask not connected");
    const accounts = await web3.eth.getAccounts(); // Get the user's Ethereum account
    try {
        // Fetch current votes to validate the index
        const votes = await contract.methods.getAllVotes().call();
        console.log("Votes length:", votes.length, "Index to delete:", index);
        
        // Check if the array is empty or the index is invalid
        if (votes.length === 0) {
            alert("No votes to delete!");
            return;
        }
        if (index >= votes.length) {
            alert("Invalid vote index! Please refresh and try again.");
            loadVotes(); // Refresh to sync UI with contract state
            return;
        }

        // Call the smart contract's deleteVote function
        await contract.methods.deleteVote(index).send({ 
            from: accounts[0], 
            gas: 100000 // Provide a gas buffer to avoid estimation issues
        });
        loadVotes(); // Refresh the list of votes after deletion
    } catch (error) {
        console.error("Delete vote failed:", error);
        alert("Failed to delete vote: " + error.message);
    }
}

// Initialize the app
// This function runs when the page loads. It connects to MetaMask and loads the votes.
window.onload = async () => {
    const connected = await connectMetaMask(); // Connect to MetaMask
    if (connected) {
        loadVotes(); // Load the votes if MetaMask is connected
    } else {
        document.getElementById("voteList").innerHTML = "Please connect MetaMask to continue.";
    }
};
