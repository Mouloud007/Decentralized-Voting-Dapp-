// Initialize Web3 with safer handling
let web3;
if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
} else {
    console.error("MetaMask not detected at startup");
    alert("Please install MetaMask to use this DApp!");
}

// Contract details (updated address)
const contractAddress = "0xe0c9542170a070F92aC869B4f5301B694459FCfb"; // New deployment
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
const contract = web3 ? new web3.eth.Contract(contractABI, contractAddress) : null;

// Connect MetaMask with error handling
async function connectMetaMask() {
    if (!web3) {
        alert("Please install MetaMask!");
        return false;
    }
    try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("MetaMask connected");
        return true;
    } catch (error) {
        console.error("MetaMask connection failed:", error);
        alert("Failed to connect MetaMask: " + error.message);
        return false;
    }
}

// Add a vote
async function addVote() {
    if (!web3) return alert("MetaMask not connected");
    const name = document.getElementById("nameInput").value;
    if (!name) return alert("Please enter a name");
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.addVote(name).send({ from: accounts[0] });
        document.getElementById("nameInput").value = "";
        loadVotes();
    } catch (error) {
        console.error("Add vote failed:", error);
        alert("Failed to add vote: " + error.message);
    }
}

// Load and display all votes
async function loadVotes() {
    const voteList = document.getElementById("voteList");
    voteList.innerHTML = "Loading votes...";
    if (!web3) {
        voteList.innerHTML = "Please connect MetaMask to see votes.";
        return;
    }
    try {
        const votes = await contract.methods.getAllVotes().call();
        voteList.innerHTML = "";
        votes.forEach((vote, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${vote.name} - Likes: ${vote.likes} 
                <button class="conservative" onclick="likeVote(${index})">Like</button>
                <button class="danger" onclick="deleteVote(${index})">Delete</button>
            `;
            voteList.appendChild(li);
        });
    } catch (error) {
        console.error("Load votes failed:", error);
        voteList.innerHTML = "Failed to load votes: " + error.message;
    }
}

// Like a vote
async function likeVote(index) {
    if (!web3) return alert("MetaMask not connected");
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.likeVote(index).send({ from: accounts[0] });
        loadVotes();
    } catch (error) {
        console.error("Like vote failed:", error);
        alert("Failed to like vote: " + error.message);
    }
}

// Delete a vote (fixed version)
async function deleteVote(index) {
    if (!web3) return alert("MetaMask not connected");
    const accounts = await web3.eth.getAccounts();
    try {
        // Fetch current votes to validate index
        const votes = await contract.methods.getAllVotes().call();
        console.log("Votes length:", votes.length, "Index to delete:", index);
        
        // Check if the array is empty or index is invalid
        if (votes.length === 0) {
            alert("No votes to delete!");
            return;
        }
        if (index >= votes.length) {
            alert("Invalid vote index! Please refresh and try again.");
            loadVotes(); // Refresh to sync UI with contract state
            return;
        }

        // Send transaction with a slight gas buffer
        await contract.methods.deleteVote(index).send({ 
            from: accounts[0], 
            gas: 100000 // Buffer to avoid gas estimation issues
        });
        loadVotes(); // Refresh the vote list after deletion
    } catch (error) {
        console.error("Delete vote failed:", error);
        alert("Failed to delete vote: " + error.message);
    }
}

// Initialize the app
window.onload = async () => {
    const connected = await connectMetaMask();
    if (connected) {
        loadVotes();
    } else {
        document.getElementById("voteList").innerHTML = "Please connect MetaMask to continue.";
    }
};
