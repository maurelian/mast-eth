//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../IScript.sol';

contract ExampleScript3 is IScript {
  // Include a secret value as a constant to prevent guessing the deployment bytecode for very simple conditions.
  bytes32 constant salt = 'RANDOM_SALT';

  event LogData(bytes);

  // This script is quite simple, it just logs the data it receives
  function run(bytes calldata _data) external override returns (bool) {
    emit LogData(_data);
  }
}
