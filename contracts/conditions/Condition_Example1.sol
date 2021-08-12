//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./../IConditionScript.sol";

contract Condition_Example1 is IConditionScript {
  address payable[] targets;

  function spendingCondition() external override returns(address payable[] memory _targets, bytes[] memory data ) {

  }
}