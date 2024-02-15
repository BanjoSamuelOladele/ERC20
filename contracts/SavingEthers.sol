

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SavingEthers {
      
    mapping(address => uint256) savings;

    event SavingSuccessful(address indexed user, uint256 indexed amount);

    function deposit() external payable {
        require(msg.sender != address(0), "wrong EOA");
        require(msg.value > 0, "can't save zero value");
        savings[msg.sender] = savings[msg.sender] + msg.value;
        emit SavingSuccessful(msg.sender, msg.value);
    }
    function checkSavings(address _user) external view returns (uint256) {
        return savings[_user];
    }
}