# MAST on Ethereum

A simple experimental project to implement some of the key functionality of the [Merkleized Abstract Script Tree](https://river.com/learn/terms/m/merkelized-alternative-script-tree-mast/), which is part of Bitcoin's Taproot upgrade.

Specifically:

> Merkle branches let us only reveal the actually executed part of the script to the blockchain, as opposed to all possible ways a script can be executed. Among the various known mechanisms for implementing this, one where the Merkle tree becomes part of the script's structure directly maximizes the space savings, so that approach is chosen.


**What does a script do?**

There are at least two possible approaches:
1. get approval for spending. (ie. just return a boolean.)
2. get approval AND the instructions for spending.

The instructions include things like:
  how much to send
  where to send it
  any additional calldata to send (ie for spending ERC20s)


  To keep things simple, in this case, neither the constructor, nor the target function can take arguments.
  it's all setup as immutable values in the code.
  nice and simple.