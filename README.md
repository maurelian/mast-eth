# MAST on Ethereum

A simple experimental project to implement some of the key functionality of the [Merkleized Abstract Script Tree](https://river.com/learn/terms/m/merkelized-alternative-script-tree-mast/), which is part of Bitcoin's Taproot upgrade.

Specifically:

> Merkle branches let us only reveal the actually executed part of the script to the blockchain, as opposed to all possible ways a script can be executed. Among the various known mechanisms for implementing this, one where the Merkle tree becomes part of the script's structure directly maximizes the space savings, so that approach is chosen.


**What does a script do?**

There are at least two possible approaches:
1. get approval to do something. (ie. just return a boolean.)
2. get approval AND the instructions for spending.

The instructions include things like:
  how much to send
  where to send it
  any additional calldata to send (ie for spending ERC20s)

To keep things simple, in this case, neither the constructor, nor the target function can take arguments.
It's all setup as immutable values in the code.
Nice and simple.

**How should conditions be defined?**

Conditions will be defined as simple solidity contracts. Users can write these contracts in the contracts/conditions dir.
For development and testing purposes, I will put those conditions in the test folder. Thus the merkleizing script should accept
a target directory containing the conditions.

**How should the merkle tree be generated?**

It needs to be easily testable with mocha.
It needs to make sense for the user to run.
It needs to take arguments (to specify the contracts location).

So let's just use `node scripts/scripts.ts`



