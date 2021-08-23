//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../IScript.sol';

contract TestScript1 is IScript {
  // This script is quite simple, it just returns true.
  function run() external pure override returns (bool) {
    return true;
  }
}
