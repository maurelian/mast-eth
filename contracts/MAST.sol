//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./libraries/MerkleProof.sol";
import "./IScript.sol";

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
    // mark that leaf as claimed?

    // Deploy and get the address of the new script
    IScript scriptDestination = IScript(createContract(_script));
    //  (for now scripts will not accept arguments)

    (address[] memory targets, uint[] memory amounts, bytes[] memory data) = scriptDestination.run();
    require(
      targets.length == data.length,
      "Arrays should be of equal length"
    );
    require(
      targets.length == amounts.length,
      "Arrays should be of equal length"
    );
    for (uint256 i = 0; i < targets.length; i++) {
      // Do not check return values, we don't want any one target to be able to prevent the
      // completion of a spend.
      targets[i].call{value: amounts[i]}(data[i]);
    }
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
