//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './../IScript.sol';
import './../ActionState.sol';

// This is a speed bump example. It ensures that at least 1 day has passed since the last spend.
contract ExampleScript_SpeedBump is ActionState, IScript {
  uint256 constant MIN_INTERVAL = 1 days;

  function run() external override returns (bool) {
    require(
      block.timestamp - lastAction.timestamp > MIN_INTERVAL,
      'Trying to spend too soon'
    );
    return true;
  }
}
