//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IScript {
  function run(bytes calldata _data) external returns (bool);
}
