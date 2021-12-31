//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../IScript.sol';

contract ExampleScript3 is IScript {
  // Include a secret value as a constant to prevent guessing the deployment bytecode for very simple conditions.
  bytes32 constant salt = 'RANDOM_SALT';

  function run() external override returns (bool) {
    return true;
  }
}
