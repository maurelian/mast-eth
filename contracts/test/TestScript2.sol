//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../IScript.sol';

interface Signal {
  function yesOrNo() external returns(bool);
}

contract TestScript2 is IScript {

  // This script returns a boolean based on what it gets from calling anothing contract.
  // You could use this method to bake in a bit of additional flexibility.
  Signal constant signal = Signal(address(0));
  function run() external pure override returns (bool) {

    return signal.yesOrNo();
  }
}
