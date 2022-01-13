# MAST on Ethereum

A simple experimental project to implement some of the key functionality of the
[Merkleized Abstract Script Tree](https://river.com/learn/terms/m/merkelized-alternative-script-tree-mast/),
which is part of Bitcoin's Taproot upgrade.

Specifically:

> Merkle branches let us only reveal the actually executed part of the script to the blockchain, as
> opposed to all possible ways a script can be executed. Among the various known mechanisms for
> implementing this, one where the Merkle tree becomes part of the script's structure directly
> maximizes the space savings, so that approach is chosen.

## Motivation

In the context of a contract on Ethereum, we can use this idea of merkleized bytecode as a
pre-commitment to the code which can be executed by a contract, without having to reveal what that
bytecode is (until it is run).

This technique could presumably be used in many ways by different types of contracts but one of the
most obvious, and most similar to the basic application of MAST on Bitcoin is a multisig wallet.

## Architecture

The architecture is intended to be simple and has two main components, script tree contract
and the scripts.

### 1. The Script Tree contract

The Script Tree contract has minimal state:

```js
  // The merkle root of allowed scripts
  bytes32 public immutable scriptsRoot;

  // A mapping of scripts which cannot be replayed
  mapping(bytes32 => bool) spentScripts;
```

The `scriptsRoot` is set in the constructor.

Aside from a `receive()` function for accepting ETH deposits, the only function is `execute()`

### 2. The Scripts

Scripts are contracts which are deployed and executed by the wallet in order to spend.

This aspect of design is very similar to the [DS-Proxy](https://github.com/dapphub/ds-proxy), so
quoting from its README:

> A user would pass in the bytecode for the contract as well as the calldata for the function they
> want to execute.
>
> The proxy will create a contract using the bytecode. It will then delegatecall the function and arguments specified in the calldata. Loading in this code is more efficient than jumping to it.

However in this case the deployed contract must also **authorization**. The design is flexible
enough to handle this using any of the following:
- `ecrecover` to validate signatures (this is a typical M of N style functionality.)
- `msg.sender` which allows for a super-admin functionality.
- `block.timestamp` which could allow an action to occur only before or after some point in time.
- nothing, ie. certain secret scripts may always be callable for some reason.
