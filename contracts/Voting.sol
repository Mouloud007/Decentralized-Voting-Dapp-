// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Vote {
        string name;
        uint256 likes;
    }

    Vote[] public votes;

    function addVote(string memory _name) public {
        votes.push(Vote(_name, 0));
    }

    function likeVote(uint256 _index) public {
        require(_index < votes.length, "Invalid vote index");
        votes[_index].likes += 1;
    }

    function getAllVotes() public view returns (Vote[] memory) {
        return votes;
    }
}