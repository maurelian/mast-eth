//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './libraries/MerkleProof.sol';
import './IScript.sol';

contract ScriptTree {
  bytes32 public immutable conditionsRoot;
  mapping(bytes32 => bool) spentScripts;

  event ScriptSpent(
    bytes32 indexed scriptHash,
    address indexed to,
    uint256 value,
    bytes data
  );

  // Do all the setup off-chain.
  constructor(bytes32 _conditionsRoot) payable {
    conditionsRoot = _conditionsRoot;
  }

  // allow deposits
  receive() external payable {}

  // submit the spending script
  function spend(
    address _to,
    uint256 _value,
    bytes calldata _data,
    bytes calldata _script,
    bytes32[] calldata _proof
  ) external {
    // verify the inclusion proof on the script
    bytes32 leaf = keccak256(_script);
    require(spentScripts[leaf] != true, 'Script already spent.');
    require(MerkleProof.verify(_proof, conditionsRoot, leaf), 'Invalid proof.');

    // Deploy and get the address of the new script.
    address scriptDestination = createContract(_script);

    // For simplicity, scripts will not accept arguments for now.
    (bool success, bytes memory res) = address(scriptDestination).delegatecall(
      abi.encodeWithSignature('run()')
    );

    bool valid = abi.decode(res, (bool));
    require(success && valid, 'Script failed');
    spentScripts[leaf] = true;

    emit ScriptSpent(leaf, _to, _value, _data);
  }

  /**
   * From Optimism's Lib_EthUtils
   * Just deploys a contract with some given initialization code.
   * @param _code Contract initialization code.
   * @return Address of the created contract.
   */
  function createContract(bytes memory _code) internal returns (address) {
    address created;
    assembly {
      created := create(0, add(_code, 0x20), mload(_code))
    }

    return created;
  }
}
