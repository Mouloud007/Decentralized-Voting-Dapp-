// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Defining the Voting contract
contract Voting {
    // Data structure
    struct Vote {
        string name;
        uint256 likes;
    }

    //  array to store all votes
    Vote[] public votes;

    //  adding a new vote with a given name
    function addVote(string memory _name) public {
        // to Push a new Vote with the given name and 0 likes to the votes array
        votes.push(Vote(_name, 0));
    }

    //  like a vote at a given index
    function likeVote(uint256 _index) public {
        // to Ensure that the provided index is valid
        require(_index < votes.length, "Invalid vote index");
        // to Increment the likes count of the vote at the specified index
        votes[_index].likes += 1;
    }

    //  delete a vote at a given index
    function deleteVote(uint256 _index) public {
        // to check if index is valid
        require(_index < votes.length, "Invalid vote index");
        // Replace the vote to be deleted with the last vote in the array
        votes[_index] = votes[votes.length - 1];
        // Remove the last vote from the array
        votes.pop();
    }

    // Function to retrieve all votes
    function getAllVotes() public view returns (Vote[] memory) {
        // Return the entire votes array
        return votes;
    }
}