pragma solidity ^0.4.17; 

contract Lottery {
    address public manager;
    address[] public players;
    
    constructor () public payable{
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether );
        
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

     function pickWinner() public restricted {
        // require(msg.sender == manager);
        
        uint index = random() % players.length;
        players[index].transfer(this.balance); //0x108908basced2355341
        players = new address[](0); //resetting players array
        
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}