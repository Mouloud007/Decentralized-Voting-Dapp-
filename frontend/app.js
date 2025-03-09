const web3 = new Web3(window.ethereum);
const contractAddress = "0x073D57f090eC844e9e103C302e1a2BcaD7f0A92f";
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
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Connect MetaMask
async function connectMetaMask() {
    if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("MetaMask connected");
    } else {
        alert("Please install MetaMask!");
    }
}

// Add a vote
async function addVote() {
    const name = document.getElementById("nameInput").value;
    if (!name) return alert("Please enter a name");
    const accounts = await web3.eth.getAccounts();
    await contract.methods.addVote(name).send({ from: accounts[0] });
    document.getElementById("nameInput").value = "";
    loadVotes();
}

// Load and display all votes
// ... (rest of the code unchanged)
async function loadVotes() {
    const voteList = document.getElementById("voteList");
    voteList.innerHTML = "";
    const votes = await contract.methods.getAllVotes().call();
    votes.forEach((vote, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${vote.name} - Likes: ${vote.likes} <button class="conservative" onclick="likeVote(${index})">Like</button>`;
        voteList.appendChild(li);
    });
}


// Like a vote
async function likeVote(index) {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.likeVote(index).send({ from: accounts[0] });
    loadVotes();
}

// Initialize
window.onload = async () => {
    await connectMetaMask();
    loadVotes();
};