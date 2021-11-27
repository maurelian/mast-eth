// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './libraries/MerkleProof.sol';

contract MerkleProofWrapper {
  function verify(
    bytes32[] memory proof,
    bytes32 root,
    bytes32 leaf
  ) public view returns (bool) {
    // todo: reset to pure
    return MerkleProof.verify(proof, root, leaf);
  }
}
