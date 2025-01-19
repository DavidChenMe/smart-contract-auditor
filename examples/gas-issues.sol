pragma solidity ^0.8.0;

contract GasIssuesContract {
    uint[] public items;
    address[] public users;
    
    function addMultipleItems(uint[] memory newItems) public {
        for (uint i = 0; i < newItems.length; i++) {
            items.push(newItems[i]);
        }
    }
    
    function processAllUsers() public {
        for (uint i = 0; i < users.length; i++) {
            // Some processing that could run out of gas
            payable(users[i]).call{gas: 2300}("");
        }
    }
    
    function batchTransfer(address[] memory recipients, uint amount) public {
        while (recipients.length > 0) {
            payable(recipients[recipients.length - 1]).transfer(amount);
        }
    }
}