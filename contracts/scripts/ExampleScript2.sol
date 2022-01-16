//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../IScript.sol';

// A script that can always be called by a particular account.
contract ExampleScript2 is IScript {
  error NotAllowed();
  event RunCalled();
  address private constant allowed = 0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF;

  function run(bytes calldata) external override returns (bool) {
    if (msg.sender != allowed) {
      revert NotAllowed();
    }
    emit RunCalled();
    return true;
  }
}
