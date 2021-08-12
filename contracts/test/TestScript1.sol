//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../IScript.sol";

contract TestScript1 is IScript {

  // A super simple example, it just sends all the funds to address(0xFF)
  function run()
    external
    pure
    override
  returns(
    address[] memory,
    uint[] memory,
    bytes[] memory
  ) {
      address[] memory targets = new address[](1);
      uint[] memory amounts = new uint[](1);
      bytes[] memory data = new bytes[](1);

      targets[0] = address(0xff);
      amounts[0] = 0;
      data[0] = hex"";

    return (
      targets,
      amounts,
      data
    );
  }
}