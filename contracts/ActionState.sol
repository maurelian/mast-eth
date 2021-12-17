//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ActionState {
  struct Action {
    address to;
    uint256 value;
    bytes data;
    uint256 timestamp;
  }

  // We record these values so that they can be used in the auth script
  Action public lastAction;
  Action public pendingAction;
  uint256 public numActions;
}
