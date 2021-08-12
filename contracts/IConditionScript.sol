//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IConditionScript {
  function spendingCondition() external returns(address payable[] memory targets, bytes[] memory data);
}
