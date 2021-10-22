pragma solidity ^0.4.17; 

contract Lottery {
    address public manager;
    address[] public players;
    
    constructor () public payable{
        manager = msg.sender;
    }
    

}