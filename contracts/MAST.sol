//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./libraries/MerkleProof.sol";
import "./IConditionScript.sol";

contract MAST {


  bytes32 public immutable conditionsRoot;

  // Do all the setup off-chain.
  constructor(bytes32 _conditionsRoot) {
    conditionsRoot = _conditionsRoot;
  }

  // submit the spending script
  function spend(
    bytes32[] calldata _proof,
    bytes calldata _script
  ) external {
    // verify the inclusion proof on the script
    bytes32 leaf = keccak256(abi.encode(_script));

    require(
      MerkleProof.verify(_proof, conditionsRoot, leaf),
      "Invalid proof."
    );

    // Deploy and get the address of the new script
    IConditionScript scriptDestination = IConditionScript(createContract(_script));
    //  (for now scripts will not accept arguments)

    (address payable[] memory targets, bytes[] memory data) = scriptDestination.spendingCondition();
  }


    /**
     * From Optimism's Lib_EthUtils
     * Creates a contract with some given initialization code.
     * @param _code Contract initialization code.
     * @return Address of the created contract.
     */
    function createContract(
        bytes memory _code
    )
        internal
        returns (
            address
        )
    {
        address created;
        assembly {
            created := create(
                0,
                add(_code, 0x20),
                mload(_code)
            )
        }

        return created;
    }
}
