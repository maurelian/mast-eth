//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IScript {
  function run() external returns(address[] memory targets, uint[] memory amounts, bytes[] memory data);
}
