//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../IScript.sol';

contract ExampleScript1 is IScript {
  event LogData(bytes);

  // This script is quite simple, it just logs the data it receives with no auth
  function run(bytes calldata _data) external override returns (bool) {
    emit LogData(_data);
    return true;
  }
}
